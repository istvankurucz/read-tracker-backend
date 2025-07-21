import { Request, Response, NextFunction } from "express";
import getListSelect from "../../services/list/getListSelect";
import { ListSelect } from "../../types/listTypes";

export default async function getListSelectMW(req: Request, res: Response, next: NextFunction) {
	// Get list ID
	const { listId } = req.params as { listId: string };

	try {
		// Get list
		const list = await getListSelect(listId);

		// Add list to res.locals
		(res.locals.list as ListSelect) = list;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
