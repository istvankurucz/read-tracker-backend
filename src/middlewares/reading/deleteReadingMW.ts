import { Request, Response, NextFunction } from "express";
import { Reading } from "../../types/readingTypes";
import deleteReading from "../../services/reading/deleteReading";

export default async function deleteReadingMW(_: Request, res: Response, next: NextFunction) {
	// Get reading
	const { reading } = res.locals as { reading: Reading };

	try {
		// Delete reading
		await deleteReading(reading.id);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
