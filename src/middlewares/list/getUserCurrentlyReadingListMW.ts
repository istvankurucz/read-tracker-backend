import { Request, Response, NextFunction } from "express";
import { User } from "../../types/userTypes";
import getCurrentlyReadingListByUserId from "../../services/list/getCurrentlyReadingListByUserId";
import { List } from "../../types/listTypes";

export default async function getUserCurrentlyReadingListMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get user
	const { user } = res.locals as { user: User };

	try {
		// Get list
		const currentlyReadingList = await getCurrentlyReadingListByUserId(user.id);

		// Add list to res.locals
		(res.locals.currentlyReadingList as List) = currentlyReadingList;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
