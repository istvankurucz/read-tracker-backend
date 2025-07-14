import { Request, Response, NextFunction } from "express";
import { BookSearchData } from "../../utils/book/validation/schemas/bookSearchSchema";
import searchLocalBooks from "../../services/book/searchLocalBooks";
import { BookResult } from "../../types/bookTypes";

export default async function searchLocalBooksMW(_: Request, res: Response, next: NextFunction) {
	// Get search data
	const {
		searchData: { q, limit },
	} = res.locals as { searchData: BookSearchData };

	try {
		// Get local results
		const localBooks = await searchLocalBooks({ q, limit });

		// Add results to res.locals
		res.locals.books = {};
		(res.locals.books.local as BookResult[]) = localBooks;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
