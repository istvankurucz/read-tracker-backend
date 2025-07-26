import { Request, Response, NextFunction } from "express";
import { CreateReadingData } from "../../utils/reading/validation/schemas/createReadingSchema";
import createReading from "../../services/reading/createReading";
import { UserSelect } from "../../types/userTypes";
import { LocalBook } from "../../types/bookTypes";
import { Reading } from "../../types/readingTypes";

export default async function createReadingMW(_: Request, res: Response, next: NextFunction) {
	// Get user, book and reading data
	const { user, book, readingData } = res.locals as {
		user: UserSelect;
		book: LocalBook;
		readingData: CreateReadingData;
	};

	try {
		// Create reading
		const { bookId, userId, ...reading } = await createReading({
			pages: readingData.pages ?? book.pages,
			status: readingData.status,
			startedAt: new Date(readingData.startedAt),
			finishedAt: readingData.finishedAt ? new Date(readingData.finishedAt) : null,
			bookId: book.id,
			userId: user.id,
		});

		// Add reading to res.locals
		(res.locals.reading as Reading) = {
			...reading,
			snapshots: [],
		};

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
