import { Request, Response, NextFunction } from "express";
import { User } from "../../types/userTypes";
import deleteListsByUserId from "../../services/list/deleteListsByUserId";

export default async function deleteUserListsMW(_: Request, res: Response, next: NextFunction) {
	// Get user
	const { user } = res.locals as { user: User };

	try {
		// Delete user book joins
		await deleteListsByUserId(user.id);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
