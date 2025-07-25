import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { BookTable } from "../../drizzle/schema/BookTable";
import { ReviewTable } from "../../drizzle/schema/ReviewTable";
import { UserTable } from "../../drizzle/schema/UserTable";
import { Review } from "../../types/reviewTypes";
import { REVIEW_COLUMNS } from "../../constants/review/reviewColumns";
import AppError from "../../classes/AppError";
import getLocalBook from "../book/getLocalBook";

export default async function getReview(id: string): Promise<Review> {
	// Get review
	const [reviewRaw] = await db
		.select(REVIEW_COLUMNS)
		.from(ReviewTable)
		.innerJoin(BookTable, eq(ReviewTable.bookId, BookTable.id))
		.innerJoin(UserTable, eq(ReviewTable.userId, UserTable.id))
		.where(eq(ReviewTable.id, id));

	// Check review
	if (!reviewRaw) throw new AppError({ message: "Review not found.", status: 404 });

	// Get reviewed book
	const book = await getLocalBook(reviewRaw.bookId);

	// Extract book ID from review
	const { bookId, ...reviewRest } = reviewRaw;

	// Return review
	return { ...reviewRest, book };
}
