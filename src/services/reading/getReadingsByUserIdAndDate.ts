import { db } from "../../drizzle/db";
import { DateRange } from "../../types/helperTypes";
import { Reading } from "../../types/readingTypes";
import mapBookToReading from "../../utils/reading/mapBookToReading";
import getLocalBooks from "../book/getLocalBooks";

export default async function getReadingsByUserIdAndDate(params: {
	userId: string;
	dates: DateRange;
}): Promise<Reading[]> {
	// Extract params
	const {
		userId,
		dates: { start, end },
	} = params;

	// Get readings
	const readingsRaw = await db.query.ReadingTable.findMany({
		columns: {
			userId: false,
		},
		with: {
			snapshots: {
				columns: {
					readingId: false,
				},
				orderBy: (snapshot, { desc }) => desc(snapshot.timestamp),
			},
		},
		where: (reading, { and, eq, gte, lte, isNotNull }) =>
			and(
				eq(reading.userId, userId),
				and(isNotNull(reading.startedAt), gte(reading.startedAt, start)),
				and(isNotNull(reading.finishedAt), lte(reading.finishedAt, end))
			),
		orderBy: (reading, { asc }) => asc(reading.startedAt),
	});

	// Get books
	const bookIds = readingsRaw.map((reading) => reading.bookId);
	const books = await getLocalBooks(bookIds);

	// Add book to reading
	const readings = readingsRaw.map((reading) => mapBookToReading(reading, books));

	// Return readings
	return readings;
}
