import { Request, Response, NextFunction } from "express";
import getList from "../../services/list/getList";
import { List } from "../../types/listTypes";

export default async function getListMW(req: Request, res: Response, next: NextFunction) {
	// Get user and list ID
	const { listId } = req.params as { listId: string };

	try {
		// Get list
		const list = await getList(listId);

		// Add list to res.locals
		(res.locals.list as List) = list;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
