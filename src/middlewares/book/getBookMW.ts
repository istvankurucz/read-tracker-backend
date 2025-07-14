import { Request, Response, NextFunction } from "express";
import getBook from "../../services/book/getBook";
import { Book } from "../../types/bookTypes";

export default async function getBookMW(req: Request, res: Response, next: NextFunction) {
	// Get book ID
	const { bookId } = req.params as { bookId: string };

	try {
		// Get book
		const book = await getBook(bookId);

		// Add book to res.locals
		(res.locals.book as Book) = book;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
