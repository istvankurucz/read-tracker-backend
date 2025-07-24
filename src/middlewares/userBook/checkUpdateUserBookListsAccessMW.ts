import { Request, Response, NextFunction } from "express";
import { List } from "../../types/listTypes";
import { UpdateUserBookListsData } from "../../utils/userBook/validation/schemas/updateUserBookListsSchema";
import AppError from "../../classes/AppError";

export default function checkUpdateUserBookListsAccessMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get lists and lists data
	const { lists, listsData } = res.locals as { lists: List[]; listsData: UpdateUserBookListsData };

	// Get list IDs
	const listIds = lists.map((list) => list.id);

	try {
		// System list
		if (listsData.systemListId && !listIds.includes(listsData.systemListId)) {
			throw new AppError({ message: "Access denied.", status: 403 });
		}

		// Custom lists
		for (const customListId of listsData.customListIds) {
			if (!listIds.includes(customListId)) {
				throw new AppError({ message: "Access denied.", status: 403 });
			}
		}

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
