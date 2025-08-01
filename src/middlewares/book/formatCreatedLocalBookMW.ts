import { Request, Response, NextFunction } from "express";
import { Book, BookSelect, LocalBook } from "../../types/bookTypes";
import { Author } from "../../types/authorTypes";
import { User } from "../../types/userTypes";

export default function formatCreatedLocalBookMW(_: Request, res: Response, next: NextFunction) {
	// Get book, authors, book data and user
	const { book, authors, bookData, user } = res.locals as {
		book: BookSelect;
		authors: Author[];
		bookData: Book;
		user: User;
	};

	// Check local book
	if (bookData.source === "local") return next();

	// Extract user ID from book
	const { userId, ...restBook } = book;

	// Update book in res.locals
	(res.locals.book as LocalBook) = {
		...restBook,
		authors,
		user,
		rating: { average: 0, count: 0 },
		source: "local",
	};

	// Go to next MW
	return next();
}
