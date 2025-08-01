import { Request, Response, NextFunction } from "express";
import getReading from "../../services/reading/getReading";
import { User } from "../../types/userTypes";
import { Reading } from "../../types/readingTypes";

export default async function getReadingMW(req: Request, res: Response, next: NextFunction) {
	// Get user and reading ID
	const { user } = res.locals as { user: User };
	const { readingId } = req.params as { readingId: string };

	try {
		// Get reading
		const reading = await getReading(readingId, { userId: user.id });

		// Add reading to res.locals
		(res.locals.reading as Reading) = reading;

		//  Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
