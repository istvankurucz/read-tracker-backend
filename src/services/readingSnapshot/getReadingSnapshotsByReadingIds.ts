import { desc, inArray } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { ReadingSnapshotSelect } from "../../types/readingSnapshotTypes";

export default async function getReadingSnapshotsByReadingIds(
	readingIds: string[]
): Promise<ReadingSnapshotSelect[]> {
	// Get reading snapshots
	const snapshots = await db.query.ReadingSnapshotTable.findMany({
		where: (snapshot, { inArray }) => inArray(snapshot.readingId, readingIds),
		orderBy: (snapshot, { asc }) => asc(snapshot.timestamp),
	});

	// Return snapshots
	return snapshots;
}
