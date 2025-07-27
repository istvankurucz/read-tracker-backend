import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { ReadingSnapshotTable } from "../../drizzle/schema/ReadingSnapshotTable";
import { ReadingSnapshotSelect, ReadingSnapshotUpdate } from "../../types/readingSnapshotTypes";
import AppError from "../../classes/AppError";

export default async function updateReadingSnapshot(
	id: string,
	data: ReadingSnapshotUpdate
): Promise<ReadingSnapshotSelect> {
	// Update snapshot
	const [snapshot] = await db
		.update(ReadingSnapshotTable)
		.set(data)
		.where(eq(ReadingSnapshotTable.id, id))
		.returning();

	// Check snapshot
	if (!snapshot) throw new AppError({ message: "Error updating reading snaphot." });

	// Return snapshot
	return snapshot;
}
