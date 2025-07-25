import { Request, Response, NextFunction } from "express";
import { UserSelect } from "../../types/userTypes";
import getReviewsByUserId from "../../services/review/getReviewsByUserId";
import { Review } from "../../types/reviewTypes";

export default async function getUserReviewsMW(_: Request, res: Response, next: NextFunction) {
	// Get user
	const { user } = res.locals as { user: UserSelect };

	try {
		// Get reviews
		const reviews = await getReviewsByUserId(user.id);

		// Add reviews to res.locals
		(res.locals.reviews as Review[]) = reviews;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
