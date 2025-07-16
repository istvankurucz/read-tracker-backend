import { Request, Response, NextFunction } from "express";
import { LocalBook } from "../../types/bookTypes";
import { UpdateBookData } from "../../utils/book/validation/schemas/updateBookSchema";
import checkNonEmptyObject from "../../utils/general/checkNonEmptyObject";
import updateBook from "../../services/book/updateBook";

export default async function updateBookMW(_: Request, res: Response, next: NextFunction) {
	// Get book and book data
	const { book, bookData } = res.locals as { book: LocalBook; bookData: UpdateBookData };

	// Check update data
	if (!checkNonEmptyObject(bookData)) return next();

	try {
		// Update book
		const updatedBook = await updateBook(book.id, {
			title: bookData.title,
			subtitle: bookData.subtitle,
			coverUrl: bookData.coverUrl,
			pages: bookData.pages,
			language: bookData.language,
			isbn: bookData.isbn,
			genre: bookData.genre,
			description: bookData.description,
			releaseDate: bookData.releaseDate ? new Date(bookData.releaseDate) : null,
		});

		// Update book in res.locals
		(res.locals.book as LocalBook) = {
			...book,
			...updatedBook,
		};

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
