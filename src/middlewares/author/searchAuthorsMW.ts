import { Request, Response, NextFunction } from "express";
import { AuthorSearchData } from "../../utils/author/validation/schemas/authorSearchSchemas";
import { AuthorSelect } from "../../types/authorTypes";
import searchAuthors from "../../services/author/searchAuthors";

export default async function searchAuthorsMW(_: Request, res: Response, next: NextFunction) {
	// Get search data
	const {
		searchData: { q, limit },
	} = res.locals as { searchData: AuthorSearchData };

	try {
		// Get author results
		const authors = await searchAuthors({ q, limit });

		// Add results to res.locals
		(res.locals.authors as AuthorSelect[]) = authors;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
