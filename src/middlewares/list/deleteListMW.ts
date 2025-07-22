import { Request, Response, NextFunction } from "express";
import { ListSelect } from "../../types/listTypes";
import deleteList from "../../services/list/deleteList";

export default async function deleteListMW(_: Request, res: Response, next: NextFunction) {
	// Get list
	const { list } = res.locals as { list: ListSelect };

	try {
		// Delete list
		await deleteList(list.id);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
