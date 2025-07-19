import { Request, Response, NextFunction } from "express";
import { Book, BookSelect } from "../../types/bookTypes";
import createBook from "../../services/book/createBook";
import { UserSelect } from "../../types/userTypes";

export default async function createLocalBookFromGoogleBookMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get user and book
	const { user, book: bookData } = res.locals as { user: UserSelect; book: Book };

	// Check local book
	if (bookData.source === "local") return next();

	// Add authors to res.locals
	(res.locals.bookData as { authors: string[] }) = { authors: bookData.authors };

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
		return next();
	}
}
