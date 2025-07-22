import { Request, Response, NextFunction } from "express";
import { CreateListData } from "../../utils/list/validation/schemas/createListSchema";
import createList from "../../services/list/createList";
import { UserSelect } from "../../types/userTypes";
import { List } from "../../types/listTypes";

export default async function createListMW(_: Request, res: Response, next: NextFunction) {
	// Get user and list data
	const { user, listData } = res.locals as { user: UserSelect; listData: CreateListData };

	try {
		// Create list
		const { userId, ...list } = await createList({ ...listData, userId: user.id });

		// Add list to res.locals
		(res.locals.list as List) = {
			...list,
			books: [],
		};

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
