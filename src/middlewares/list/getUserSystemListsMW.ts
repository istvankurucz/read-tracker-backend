import { Request, Response, NextFunction } from "express";
import { UserSelect } from "../../types/userTypes";
import getSystemListsByUserId from "../../services/list/getSystemListsByUserId";
import { List } from "../../types/listTypes";

export default async function getUserSystemListsMW(_: Request, res: Response, next: NextFunction) {
	// Get user
	const { user } = res.locals as { user: UserSelect };

	try {
		// Get lists
		const lists = await getSystemListsByUserId(user.id);

		// Add lists to res.locals
		(res.locals.lists as List[]) = lists;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
