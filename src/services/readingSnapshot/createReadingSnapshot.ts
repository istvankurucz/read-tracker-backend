import AppError from "../../classes/AppError";
import { db } from "../../drizzle/db";
import { ReadingSnapshotTable } from "../../drizzle/schema/ReadingSnapshotTable";
import { ReadingSnapshotInsert, ReadingSnapshotSelect } from "../../types/readingSnapshotTypes";

export default async function createReadingSnapshot(
	data: ReadingSnapshotInsert
): Promise<ReadingSnapshotSelect> {
	// Create snapshot
	const [snapshot] = await db.insert(ReadingSnapshotTable).values(data).returning();

	// Check snapshot
	if (!snapshot) throw new AppError({ message: "Error creating snapshot." });

	// Return snapshot
	return snapshot;
}
