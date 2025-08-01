import { Request, Response, NextFunction } from "express";
import { User } from "../../types/userTypes";
import { Review } from "../../types/reviewTypes";
import AppError from "../../classes/AppError";

export default function checkReviewWriteAccessMW(_: Request, res: Response, next: NextFunction) {
	// Get user and review
	const { user, review } = res.locals as { user: User; review: Review };

	try {
		// Check access
		if (review.user.id !== user.id) {
			throw new AppError({ message: "Access denied.", status: 403 });
		}

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
