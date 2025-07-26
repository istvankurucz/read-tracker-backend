import AppError from "../../classes/AppError";
import { db } from "../../drizzle/db";
import { Reading } from "../../types/readingTypes";
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
			bookId: false,
		},
		where: (reading, { and, eq }) => and(eq(reading.id, id), eq(reading.userId, userId)),
	});

	// Check reading
	if (!readingRaw) throw new AppError({ message: "Reading not found.", status: 404 });

	// Get snapshots
	const snapshots = await getReadingSnapshotsByReadingId(readingRaw.id);

	// Return reading
	return { ...readingRaw, snapshots };
}
