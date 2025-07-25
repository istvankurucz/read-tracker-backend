import { Request, Response, NextFunction } from "express";
import { Review } from "../../types/reviewTypes";
import { UpdateReviewData } from "../../utils/review/validation/schemas/updateReviewSchema";
import checkNonEmptyObject from "../../utils/general/checkNonEmptyObject";
import updateReview from "../../services/review/updateReview";

export default async function updateReviewMW(_: Request, res: Response, next: NextFunction) {
	// Get review and review data
	const { review, reviewData } = res.locals as { review: Review; reviewData: UpdateReviewData };

	// Check review data
	if (!checkNonEmptyObject(reviewData)) return next();

	try {
		// Update review
		const { bookId, userId, ...reviewRest } = await updateReview(review.id, reviewData);

		// Update review in res.locals
		(res.locals.review as Review) = {
			...review,
			...reviewRest,
		};

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
