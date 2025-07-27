import AppError from "../../classes/AppError";
import { db } from "../../drizzle/db";
import { ReadingSnapshot } from "../../types/readingSnapshotTypes";

export default async function getReadingSnapshot(id: string): Promise<ReadingSnapshot> {
	// Get snapshot
	const snapshot = await db.query.ReadingSnapshotTable.findFirst({
		columns: {
			readingId: false,
		},
		where: (snapshot, { eq }) => eq(snapshot.id, id),
	});

	// Check snapshot
	if (!snapshot) throw new AppError({ message: "Snapshot not found.", status: 404 });

	// Return snapshot
	return snapshot;
}
