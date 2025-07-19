import { Request, Response, NextFunction } from "express";
import { LocalBook } from "../../types/bookTypes";
import deleteBook from "../../services/book/deleteBook";

export default async function deleteBookMW(_: Request, res: Response, next: NextFunction) {
	// Get book
	const { book } = res.locals as { book: LocalBook };

	try {
		// Delete book
		await deleteBook(book.id);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
