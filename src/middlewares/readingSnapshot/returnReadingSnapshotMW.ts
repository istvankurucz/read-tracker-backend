import { Request, Response } from "express";
import { ReadingSnapshot } from "../../types/readingSnapshotTypes";

export default function returnReadingSnapshotMW(_: Request, res: Response) {
	// Get snapshot
	const { snapshot } = res.locals as { snapshot: ReadingSnapshot };

	// Return snapshot
	res.status(200).json(snapshot);
}
