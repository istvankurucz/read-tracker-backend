import { and, eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { ReadingTable } from "../../drizzle/schema/ReadingTable";
import { Reading } from "../../types/readingTypes";
import getReadingSnapshotsByReadingIds from "../readingSnapshot/getReadingSnapshotsByReadingIds";
import mapSnapshotsToReading from "../../utils/reading/mapSnapshotsToReading";
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
		where: (reading, { and, eq }) => and(eq(reading.userId, userId), eq(reading.bookId, bookId)),
		orderBy: (reading, { asc }) => asc(reading.startedAt),
	});

	// Get book
	const book = await getLocalBook(bookId);

	// Add book to readings
	const readingsWithBook = readingsRaw.map((reading) => ({ ...reading, book }));

	// Get reading snapshots
	const readingIds = readingsWithBook.map((reading) => reading.id);
	const snapshots = await getReadingSnapshotsByReadingIds(readingIds);

	// Map snapshots to readings
	const readings = readingsWithBook.map((reading) => mapSnapshotsToReading(reading, snapshots));

	// Return readings
	return readings;
}
