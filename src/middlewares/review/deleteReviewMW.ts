import { Request, Response, NextFunction } from "express";
import { Review } from "../../types/reviewTypes";
import deleteReview from "../../services/review/deleteReview";

export default async function deleteReviewMW(_: Request, res: Response, next: NextFunction) {
	// Get review
	const { review } = res.locals as { review: Review };

	try {
		// Delete review
		await deleteReview(review.id);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
