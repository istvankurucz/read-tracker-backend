import { Request, Response, NextFunction } from "express";
import { ReadingSnapshot } from "../../types/readingSnapshotTypes";
import { UpdateReadingSnapshotData } from "../../utils/readingSnapshot/validation/schemas/updateReadingSnapshotSchema";
import updateReadingSnapshot from "../../services/readingSnapshot/updateReadingSnapshot";
import checkNonEmptyObject from "../../utils/general/checkNonEmptyObject";

export default async function updateReadingSnapshotMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get snapshot and snapshot data
	const { snapshot, snapshotData } = res.locals as {
		snapshot: ReadingSnapshot;
		snapshotData: UpdateReadingSnapshotData;
	};

	// Check snapshot data
	if (!checkNonEmptyObject(snapshotData)) return next();

	try {
		// Update snapshot
		const { readingId, ...updatedSnapshot } = await updateReadingSnapshot(snapshot.id, {
			page: snapshotData.page,
			timestamp: snapshotData.timestamp ? new Date(snapshotData.timestamp) : undefined,
			time: snapshotData.time,
			finishedBook: snapshotData.finishedBook,
		});

		// Update snapshot in res.locals
		(res.locals.snapshot as ReadingSnapshot) = {
			...snapshot,
			...updatedSnapshot,
		};

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
