import { Request, Response, NextFunction } from "express";
import { CreateBookData } from "../../utils/book/validation/schemas/createBookSchema";
import { User } from "../../types/userTypes";
import createBook from "../../services/book/createBook";
import { BookSelect } from "../../types/bookTypes";

export default async function createBookMW(_: Request, res: Response, next: NextFunction) {
	// Get book data and user
	const { bookData, user } = res.locals as { bookData: CreateBookData; user: User };

	try {
		// Create book
		const book = await createBook({
			title: bookData.title,
			subtitle: bookData.subtitle,
			coverUrl: bookData.coverUrl ?? "URL to be updated.",
			pages: bookData.pages,
			language: bookData.language,
			isbn: bookData.isbn,
			genre: bookData.genre,
			description: bookData.description,
			releaseDate: bookData.releaseDate ? new Date(bookData.releaseDate) : null,
			userId: user.id,
		});

		// Add book to res.locals
		(res.locals.book as BookSelect) = book;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
