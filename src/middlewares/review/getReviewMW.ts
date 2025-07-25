import { Request, Response, NextFunction } from "express";
import getReview from "../../services/review/getReview";
import { Review } from "../../types/reviewTypes";

export default async function getReviewMW(req: Request, res: Response, next: NextFunction) {
	// Get review ID
	const { reviewId } = req.params as { reviewId: string };

	try {
		// Get review
		const review = await getReview(reviewId);

		// Add review to res.locals
		(res.locals.review as Review) = review;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
