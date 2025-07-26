import { Request, Response, NextFunction } from "express";
import { LocalBook } from "../../types/bookTypes";
import deleteReadingsByUserIdAndBookId from "../../services/reading/deleteReadingsByUserIdAndBookId";
import { UserSelect } from "../../types/userTypes";

export default async function deleteUserBookReadingsMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get user and book
	const { user, book } = res.locals as { user: UserSelect; book: LocalBook };

	try {
		// Delete readings
		await deleteReadingsByUserIdAndBookId({ userId: user.id, bookId: book.id });

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
