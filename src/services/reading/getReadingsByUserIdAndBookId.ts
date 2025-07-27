import { db } from "../../drizzle/db";
import { Reading } from "../../types/readingTypes";
import getLocalBook from "../book/getLocalBook";

export default async function getReadingsByUserIdAndBookId(ids: {
	userId: string;
	bookId: string;
}): Promise<Reading[]> {
	// Extract IDs
	const { userId, bookId } = ids;

	// Get readings
	const readingsRaw = await db.query.ReadingTable.findMany({
		columns: {
			userId: false,
			bookId: false,
		},
		with: {
			snapshots: {
				columns: {
					readingId: false,
				},
				orderBy: (snapshot, { desc }) => desc(snapshot.timestamp),
			},
		},
		where: (reading, { and, eq }) => and(eq(reading.userId, userId), eq(reading.bookId, bookId)),
		orderBy: (reading, { asc }) => asc(reading.startedAt),
	});

	// Get book
	const book = await getLocalBook(bookId);

	// Add book to readings
	const readings = readingsRaw.map((reading) => ({ ...reading, book }));

	// Return readings
	return readings;
}
