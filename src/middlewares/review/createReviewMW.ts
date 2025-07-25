import { Request, Response, NextFunction } from "express";
import { UserSelect } from "../../types/userTypes";
import { LocalBook } from "../../types/bookTypes";
import { CreateReviewData } from "../../utils/review/validation/schemas/createReviewSchema";
import createReview from "../../services/review/createReview";
import { Review } from "../../types/reviewTypes";

export default async function createReviewMW(_: Request, res: Response, next: NextFunction) {
	// Get user, book and review data
	const { user, book, reviewData } = res.locals as {
		user: UserSelect;
		book: LocalBook;
		reviewData: CreateReviewData;
	};

	try {
		// Create review
		const { bookId, userId, ...review } = await createReview({
			rating: reviewData.rating,
			finishedBook: reviewData.finishedBook,
			comment: reviewData.comment,
			bookId: book.id,
			userId: user.id,
		});

		// Add review to res.locals
		(res.locals.review as Review) = {
			...review,
			user,
			book,
		};

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
