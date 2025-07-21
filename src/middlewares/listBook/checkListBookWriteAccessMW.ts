import { Request, Response, NextFunction } from "express";
import { UserSelect } from "../../types/userTypes";
import { ListSelect, ListWithUserId } from "../../types/listTypes";
import AppError from "../../classes/AppError";

export default function checkListBookWriteAccessMW(_: Request, res: Response, next: NextFunction) {
	// Get user and list
	const { user, list } = res.locals as { user: UserSelect; list: ListSelect | ListWithUserId };

	try {
		// Check access
		if (list.userId !== user.id) throw new AppError({ message: "Access denied.", status: 403 });

		// Go to next MW
		return next();
	} catch (err) {
		return next();
	}
}
