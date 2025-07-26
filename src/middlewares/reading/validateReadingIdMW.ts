import { Request, Response, NextFunction } from "express";
import validateUUID from "../../utils/general/validateUUID";
import AppError from "../../classes/AppError";

export default function validateReadingIdMW(req: Request, _: Response, next: NextFunction) {
	// Get reading ID
	const { readingId } = req.params as { readingId: string };

	try {
		// Validation
		if (!validateUUID(readingId)) {
			throw new AppError({ message: "Invalid reading ID.", status: 400 });
		}

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
