import { ReadingSnapshot, ReadingSnapshotSelect } from "../../types/readingSnapshotTypes";
import { Reading } from "../../types/readingTypes";

export default function mapSnapshotsToReading(
	reading: Omit<Reading, "snapshots">,
	snapshots: ReadingSnapshotSelect[]
): Reading {
	// Get reading snapshots
	const readingSnapshotsRaw = snapshots.filter((snapshot) => snapshot.readingId === reading.id);

	// Format reading snapshots
	const readingSnapshots: ReadingSnapshot[] = readingSnapshotsRaw.map((reading) => {
		// Extract reading ID
		const { readingId, ...restReadingSnapshot } = reading;

		// Return reading snapshots
		return restReadingSnapshot;
	});

	// Return reading
	return { ...reading, snapshots: readingSnapshots };
}
