import { Request, Response, NextFunction } from "express";
import { LocalBook } from "../../types/bookTypes";
import { User } from "../../types/userTypes";
import AppError from "../../classes/AppError";

export default function checkBookUpdateAccessMW(_: Request, res: Response, next: NextFunction) {
	// Get book and user
	const { book, user } = res.locals as { book: LocalBook; user: User };

	try {
		// Check access
		if (book.user.id !== user.id) throw new AppError({ message: "Access denied.", status: 403 });

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
