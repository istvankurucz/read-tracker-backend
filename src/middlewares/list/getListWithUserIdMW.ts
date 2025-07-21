import { Request, Response, NextFunction } from "express";
import { ListWithUserId } from "../../types/listTypes";
import getListWithUserId from "../../services/list/getListWithUserId";

export default async function getListWithUserIdMW(req: Request, res: Response, next: NextFunction) {
	// Get user and list ID
	const { listId } = req.params as { listId: string };

	try {
		// Get list
		const list = await getListWithUserId(listId);

		// Add list to res.locals
		(res.locals.list as ListWithUserId) = list;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
