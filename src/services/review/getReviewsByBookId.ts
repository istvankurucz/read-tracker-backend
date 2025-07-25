import { desc, eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { ReviewTable } from "../../drizzle/schema/ReviewTable";
import { UserTable } from "../../drizzle/schema/UserTable";
import { Review } from "../../types/reviewTypes";
import { BookTable } from "../../drizzle/schema/BookTable";
import getLocalBook from "../book/getLocalBook";
import { REVIEW_COLUMNS } from "../../constants/review/reviewColumns";

export default async function getReviewsByBookId(bookId: string): Promise<Review[]> {
	// Get reviews
	const reviewsRaw = await db
		.select(REVIEW_COLUMNS)
		.from(ReviewTable)
		.innerJoin(BookTable, eq(ReviewTable.bookId, BookTable.id))
		.innerJoin(UserTable, eq(ReviewTable.userId, UserTable.id))
		.where(eq(ReviewTable.bookId, bookId))
		.orderBy(desc(ReviewTable.timestamp));

	// Get book
	const book = await getLocalBook(bookId);

	// Format reviews
	const reviews: Review[] = reviewsRaw.map((review) => {
		// Extract review book ID
		const { bookId, ...reviewRest } = review;

		// Return review
		return { ...reviewRest, book };
	});

	// Return reviews
	return reviews;
}
