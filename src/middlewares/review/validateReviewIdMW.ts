import { Request, Response, NextFunction } from "express";
import validateUUID from "../../utils/general/validateUUID";
import AppError from "../../classes/AppError";

export default function validateReviewIdMW(req: Request, res: Response, next: NextFunction) {
	// Get review ID
	const { reviewId } = req.params;

	try {
		// Validation
		if (!validateUUID(reviewId))
			throw new AppError({ message: "Invalid review ID.", status: 400 });

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
