import { Request, Response, NextFunction } from "express";
import { List, ListWithUserId } from "../../types/listTypes";
import { UpdateListData } from "../../utils/list/validation/schemas/updateListSchema";
import updateList from "../../services/list/updateList";

export default async function updateListMW(_: Request, res: Response, next: NextFunction) {
	// Get list and list data
	const { list, listData } = res.locals as { list: ListWithUserId; listData: UpdateListData };

	try {
		// Update list
		const { userId, ...updatedList } = await updateList(list.id, listData);

		// Add updated list to res.locals
		(res.locals.list as List) = {
			...updatedList,
			books: list.books,
		};

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
