import { Request, Response, NextFunction } from "express";
import { BookSelect, LocalBook } from "../../types/bookTypes";
import { Author } from "../../types/authorTypes";
import { User } from "../../types/userTypes";

export default function formatCreatedBookMW(_: Request, res: Response, next: NextFunction) {
	// Get book, authors and user
	const { book, authors, user } = res.locals as {
		book: BookSelect;
		authors: Author[];
		user: User;
	};

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
