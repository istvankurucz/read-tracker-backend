import { Request, Response, NextFunction } from "express";
import { CreateAuthorData } from "../../utils/author/validation/schemas/createAuthorSchema";
import createAuthor from "../../services/author/createAuthor";
import { AuthorSelect } from "../../types/authorTypes";

export default async function createAuthorMW(_: Request, res: Response, next: NextFunction) {
	// Get author data
	const { authorData } = res.locals as { authorData: CreateAuthorData };

	try {
		// Create author
		const author = await createAuthor(authorData);

		// Add author to res.locals
		(res.locals.author as AuthorSelect) = author;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
