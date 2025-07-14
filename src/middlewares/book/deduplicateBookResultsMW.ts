import { Request, Response, NextFunction } from "express";
import { BookResult } from "../../types/bookTypes";
import deduplicateBookResults from "../../utils/book/deduplicateBookResults";

export default function deduplicateBookResultsMW(_: Request, res: Response, next: NextFunction) {
	// Get book results
	const {
		books: { local, google },
	} = res.locals as { books: { local: BookResult[]; google: BookResult[] } };

	// Deduplication
	const books = deduplicateBookResults({ local, google });

	// Update books in res.locals
	(res.locals.books as BookResult[]) = books;

	// Go to next MW
	return next();
}
