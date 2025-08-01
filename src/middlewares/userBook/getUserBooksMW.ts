import { Request, Response, NextFunction } from "express";
import { User } from "../../types/userTypes";
import getUserBooksByUserId from "../../services/userBook/getUserBooksByUserId";
import { LocalBook } from "../../types/bookTypes";

export default async function getUserBooksMW(_: Request, res: Response, next: NextFunction) {
	// Get user
	const { user } = res.locals as { user: User };

	try {
		// Get user books
		const books = await getUserBooksByUserId(user.id);

		// Add books to res.locals
		(res.locals.books as LocalBook[]) = books;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
