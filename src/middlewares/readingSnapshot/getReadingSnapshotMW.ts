import { Request, Response, NextFunction } from "express";
import getReadingSnapshot from "../../services/readingSnapshot/getReadingSnapshot";
import { ReadingSnapshot } from "../../types/readingSnapshotTypes";

export default async function getReadingSnapshotMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get snapshot ID
	const { snapshotId } = req.params as { snapshotId: string };

	try {
		// Get snapshot
		const snapshot = await getReadingSnapshot(snapshotId);

		// Add snapshot to res.locals
		(res.locals.snapshot as ReadingSnapshot) = snapshot;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
