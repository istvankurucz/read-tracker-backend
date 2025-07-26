import { Request, Response } from "express";
import { Reading } from "../../types/readingTypes";

export default function returnReadingsMW(_: Request, res: Response) {
	// Get readings
	const { readings } = res.locals as { readings: Reading[] };

	// Return readings
	res.status(200).json(readings);
}
