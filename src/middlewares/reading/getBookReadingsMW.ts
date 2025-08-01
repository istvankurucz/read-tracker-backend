import { Request, Response, NextFunction } from "express";
import { User } from "../../types/userTypes";
import { LocalBook } from "../../types/bookTypes";
import getReadingsByUserIdAndBookId from "../../services/reading/getReadingsByUserIdAndBookId";
import { Reading } from "../../types/readingTypes";

export default async function getBookReadingsMW(_: Request, res: Response, next: NextFunction) {
	// Get user and book
	const { user, book } = res.locals as { user: User; book: LocalBook };

	try {
		// Get readings
		const readings = await getReadingsByUserIdAndBookId({ userId: user.id, bookId: book.id });

		// Add readings to res.locals
		(res.locals.readings as Reading[]) = readings;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
