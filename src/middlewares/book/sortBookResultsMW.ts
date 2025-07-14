import { Request, Response, NextFunction } from "express";
import { BookResult } from "../../types/bookTypes";
import sortBookResults from "../../utils/book/sortBookResults";

export default function sortBookResultsMW(_: Request, res: Response, next: NextFunction) {
	// Get books
	const { books } = res.locals as { books: BookResult[] };

	// Sort books
	const sortedBooks = sortBookResults(books);

	// Update books in res.locals
	(res.locals.books as BookResult[]) = sortedBooks;

	// Go to next MW
	return next();
}
