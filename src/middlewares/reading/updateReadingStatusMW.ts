import { Request, Response, NextFunction } from "express";
import { Reading } from "../../types/readingTypes";
import { ReadingSnapshot } from "../../types/readingSnapshotTypes";
import updateReading from "../../services/reading/updateReading";

export default async function updateReadingStatusMW(_: Request, res: Response, next: NextFunction) {
	// Get reading and snapshot
	const { reading, snapshot } = res.locals as { reading: Reading; snapshot: ReadingSnapshot };

	console.log("Book finished:", snapshot.finishedBook);

	// Not finished book
	if (!snapshot.finishedBook) return next();

	try {
		// Update reading status
		await updateReading(reading.id, { status: "finished", finishedAt: new Date() });

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
