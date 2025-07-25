import { desc, eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { ReviewTable } from "../../drizzle/schema/ReviewTable";
import { UserTable } from "../../drizzle/schema/UserTable";
import { Review } from "../../types/reviewTypes";
import { BookTable } from "../../drizzle/schema/BookTable";
import getLocalBooks from "../book/getLocalBooks";
import AppError from "../../classes/AppError";
import { REVIEW_COLUMNS } from "../../constants/review/reviewColumns";

export default async function getReviewsByUserId(userId: string): Promise<Review[]> {
	// Get reviews
	const reviewsRaw = await db
		.select(REVIEW_COLUMNS)
		.from(ReviewTable)
		.innerJoin(BookTable, eq(ReviewTable.bookId, BookTable.id))
		.innerJoin(UserTable, eq(ReviewTable.userId, UserTable.id))
		.where(eq(ReviewTable.userId, userId))
		.orderBy(desc(ReviewTable.timestamp));

	// Get books for reviews
	const reviewBookIds = reviewsRaw.map((review) => review.bookId);
	const books = await getLocalBooks(reviewBookIds);

	// Map book to review
	const reviews: Review[] = reviewsRaw.map((review) => {
		// Extract book ID
		const { bookId, ...reviewRest } = review;

		// Get book
		const book = books.find((book) => book.id === bookId);

		// Check book
		if (!book) throw new AppError({ message: "Book not found.", status: 404 });

		// Return book
		return { ...reviewRest, book };
	});

	// Return reviews
	return reviews;
}
