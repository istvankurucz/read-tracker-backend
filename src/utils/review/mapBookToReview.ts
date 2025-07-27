import AppError from "../../classes/AppError";
import { LocalBook } from "../../types/bookTypes";
import { Review } from "../../types/reviewTypes";

type ReviewInput = Omit<Review, "book"> & { bookId: string };

export default function mapBookToReview(review: ReviewInput, books: LocalBook[]): Review {
	// Extract book ID
	const { bookId, ...reviewRest } = review;

	// Get book
	const book = books.find((book) => book.id === bookId);

	// Check book
	if (!book) throw new AppError({ message: "Book not found.", status: 404 });

	// Return book
	return { ...reviewRest, book };
}
