import { Request, Response, NextFunction } from "express";
import { UserSelect } from "../../types/userTypes";
import { LocalBook } from "../../types/bookTypes";
import AppError from "../../classes/AppError";
import checkUsedUserBook from "../../services/userBook/checkUsedUserBook";

export default async function checkBookDeleteAccessMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get user and book
	const { user, book } = res.locals as { user: UserSelect; book: LocalBook };

	try {
		// Different user
		if (book.user.id !== user.id) throw new AppError({ message: "Access denied.", status: 403 });

		// Book is used
		const usedBook = await checkUsedUserBook({ userId: user.id, bookId: book.id });
		if (usedBook) throw new AppError({ message: "Book is used by other users.", status: 403 });

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
