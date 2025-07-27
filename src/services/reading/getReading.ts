import AppError from "../../classes/AppError";
import { db } from "../../drizzle/db";
import { Reading } from "../../types/readingTypes";
import getLocalBook from "../book/getLocalBook";
import getReadingSnapshotsByReadingId from "../readingSnapshot/getReadingSnapshotsByReadingId";

export default async function getReading(
	id: string,
	options: { userId: string }
): Promise<Reading> {
	// Extract options
	const { userId } = options;

	// Get reading
	const readingRaw = await db.query.ReadingTable.findFirst({
		columns: {
			userId: false,
		},
		where: (reading, { and, eq }) => and(eq(reading.id, id), eq(reading.userId, userId)),
	});

	// Check reading
	if (!readingRaw) throw new AppError({ message: "Reading not found.", status: 404 });

	// Get book
	const book = await getLocalBook(readingRaw.bookId);

	// Get snapshots
	const snapshots = await getReadingSnapshotsByReadingId(readingRaw.id);

	// Extract book ID
	const { bookId, ...reading } = readingRaw;

	// Return reading
	return { ...reading, book, snapshots };
}
