import { Request, Response, NextFunction } from "express";
import { ReadingSnapshot } from "../../types/readingSnapshotTypes";
import deleteReadingSnapshot from "../../services/readingSnapshot/deleteReadingSnapshot";

export default async function deleteReadingSnapshotMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get snapshot
	const { snapshot } = res.locals as { snapshot: ReadingSnapshot };

	try {
		// Delete snapshot
		await deleteReadingSnapshot(snapshot.id);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
