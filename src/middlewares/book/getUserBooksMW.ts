import { Request, Response, NextFunction } from "express";
import { User } from "../../types/userTypes";
import getBooksByUserId from "../../services/book/getBooksByUserId";
import { LocalBook } from "../../types/bookTypes";

export default async function getUserBooksMW(_: Request, res: Response, next: NextFunction) {
	// Get user
	const { user } = res.locals as { user: User };

	try {
		// Get user books
		const books = await getBooksByUserId(user.id);

		// Add books to res.locals
		(res.locals.books as LocalBook[]) = books;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
