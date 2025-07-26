import { db } from "../../drizzle/db";
import { ReadingSnapshot } from "../../types/readingSnapshotTypes";

export default async function getReadingSnapshotsByReadingId(
	readingId: string
): Promise<ReadingSnapshot[]> {
	// Get snapshots
	const snapshots = await db.query.ReadingSnapshotTable.findMany({
		columns: {
			readingId: false,
		},
		where: (snapshot, { eq }) => eq(snapshot.readingId, readingId),
		orderBy: (snapshot, { asc }) => asc(snapshot.timestamp),
	});

	// Return snapshots
	return snapshots;
}
