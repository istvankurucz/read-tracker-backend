import { Request, Response } from "express";
import { Reading } from "../../types/readingTypes";

export default function returnReadingMW(_: Request, res: Response) {
	// Get reading
	const { reading } = res.locals as { reading: Reading };

	// Return reading
	res.status(200).json(reading);
}
