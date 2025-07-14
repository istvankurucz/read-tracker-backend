import { Request, Response, NextFunction } from "express";
import { BookSearchData } from "../../utils/book/validation/schemas/bookSearchSchema";
import searchGoogleBooks from "../../services/book/searchGoogleBooks";
import { BookResult } from "../../types/bookTypes";

export default async function searchGoogleBooksMW(_: Request, res: Response, next: NextFunction) {
	// Get search data
	const {
		searchData: { q, limit },
	} = res.locals as { searchData: BookSearchData };

	try {
		// Get Google Books result
		const books = await searchGoogleBooks({ q, limit });

		// Add books to res.locals
		(res.locals.books.google as BookResult[]) = books;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
