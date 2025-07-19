import { Request, Response, NextFunction } from "express";
import { LocalBook } from "../../types/bookTypes";
import createUserBook from "../../services/userBook/createUserBook";
import { UserSelect } from "../../types/userTypes";

export default async function createUserBookMW(_: Request, res: Response, next: NextFunction) {
	// Get user and book
	const { user, book } = res.locals as { user: UserSelect; book: LocalBook };

	try {
		// Create user book join
		await createUserBook({ userId: user.id, bookId: book.id });

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
