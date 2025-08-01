import { Request, Response, NextFunction } from "express";
import { User } from "../../types/userTypes";
import getReadingsByUserId from "../../services/reading/getReadingsByUserId";
import { Reading } from "../../types/readingTypes";

export default async function getUserReadingsMW(_: Request, res: Response, next: NextFunction) {
	// Get user
	const { user } = res.locals as { user: User };

	try {
		// Get readings
		const readings = await getReadingsByUserId(user.id);

		// Add readings to res.locals
		(res.locals.readings as Reading[]) = readings;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
