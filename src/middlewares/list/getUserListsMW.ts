import { Request, Response, NextFunction } from "express";
import { User } from "../../types/userTypes";
import getListsByUserId from "../../services/list/getListsByUserId";
import { List } from "../../types/listTypes";

export default async function getUserListsMW(_: Request, res: Response, next: NextFunction) {
	// Get user
	const { user } = res.locals as { user: User };

	try {
		// Get lists
		const lists = await getListsByUserId(user.id);

		// Add lists to res.locals
		(res.locals.lists as List[]) = lists;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
