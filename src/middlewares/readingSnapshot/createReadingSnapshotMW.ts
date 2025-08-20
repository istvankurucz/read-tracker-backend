import { Request, Response, NextFunction } from "express";
import { Reading } from "../../types/readingTypes";
import { CreateReadingSnapshotData } from "../../utils/readingSnapshot/validation/schemas/createReadingSnapshotSchema";
import createReadingSnapshot from "../../services/readingSnapshot/createReadingSnapshot";
import { ReadingSnapshot } from "../../types/readingSnapshotTypes";

export default async function createReadingSnapshotMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get reading and snapshot data
	const { reading, snapshotData } = res.locals as {
		reading: Reading;
		snapshotData: CreateReadingSnapshotData;
	};

	try {
		// Create snapshot
		const { readingId, ...snapshot } = await createReadingSnapshot({
			page: snapshotData.page,
			timestamp: new Date(snapshotData.timestamp),
			time: snapshotData.time,
			finishedBook: snapshotData.finishedBook,
			readingId: reading.id,
		});

		// Add snapshot to res.locals
		(res.locals.snapshot as ReadingSnapshot) = snapshot;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
