import { Request, Response, NextFunction } from "express";
import { User } from "../../types/userTypes";
import { LocalBook } from "../../types/bookTypes";
import deleteUserBook from "../../services/userBook/deleteUserBook";

export default async function deleteUserBookMW(_: Request, res: Response, next: NextFunction) {
	// Get user and book
	const { user, book } = res.locals as { user: User; book: LocalBook };

	try {
		// Delete join
		await deleteUserBook({ userId: user.id, bookId: book.id });

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
