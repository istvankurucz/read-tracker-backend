import { db } from "../../drizzle/db";
import { Reading } from "../../types/readingTypes";
import mapBookToReading from "../../utils/reading/mapBookToReading";
import getLocalBooks from "../book/getLocalBooks";

export default async function getReadingsByUserId(userId: string): Promise<Reading[]> {
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
		where: (reading, { eq }) => eq(reading.userId, userId),
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
