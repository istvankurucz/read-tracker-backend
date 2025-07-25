import { Request, Response, NextFunction } from "express";
import { LocalBook } from "../../types/bookTypes";
import getReviewsByBookId from "../../services/review/getReviewsByBookId";
import { Review } from "../../types/reviewTypes";

export default async function getBookReviewsMW(_: Request, res: Response, next: NextFunction) {
	// Get book
	const { book } = res.locals as { book: LocalBook };

	try {
		// Get reviews
		const reviews = await getReviewsByBookId(book.id);

		// Add reviews to res.locals
		(res.locals.reviews as Review[]) = reviews;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
