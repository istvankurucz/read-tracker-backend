import AppError from "../../classes/AppError";
import { LocalBook } from "../../types/bookTypes";
import { Reading } from "../../types/readingTypes";

type ReadingInput = Omit<Reading, "book"> & { bookId: string };

export default function mapBookToReading(reading: ReadingInput, books: LocalBook[]): Reading {
	// Get reading book
	const book = books.find((book) => book.id === reading.bookId);

	// Check book
	if (!book) throw new AppError({ message: "Book not found.", status: 404 });

	// Extract book ID from reading
	const { bookId, ...restReading } = reading;

	// Return reading
	return { ...restReading, book };
}
