import { Request, Response, NextFunction } from "express";
import { User } from "../../types/userTypes";
import { ListWithUserId } from "../../types/listTypes";
import AppError from "../../classes/AppError";

export default function checkListWriteAccessMW(_: Request, res: Response, next: NextFunction) {
	// Get user and list
	const { user, list } = res.locals as { user: User; list: ListWithUserId };

	try {
		// Check access
		if (list.userId !== user.id) {
			throw new AppError({ message: "Access denied.", status: 403 });
		}

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
