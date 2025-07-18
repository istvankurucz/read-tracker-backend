import { Request, Response, NextFunction } from "express";
import { UserSelect } from "../../types/userTypes";
import getAuthorsByUserId from "../../services/author/getAuthorsByUserId";
import { Author } from "../../types/authorTypes";

export default async function getUserAuthorsMW(_: Request, res: Response, next: NextFunction) {
	// Get user
	const { user } = res.locals as { user: UserSelect };

	try {
		// Get user books
		const books = await getAuthorsByUserId(user.id);

		// Add books to res.locals
		(res.locals.books as Author[]) = books;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
