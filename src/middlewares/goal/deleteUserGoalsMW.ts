import { Request, Response, NextFunction } from "express";
import { UserSelect } from "../../types/userTypes";
import deleteGoalsByUserId from "../../services/goal/deleteGoalsByUserId";

export default async function deleteUserGoalsMW(_: Request, res: Response, next: NextFunction) {
	// Get user
	const { user } = res.locals as { user: UserSelect };

	try {
		// Delete user book joins
		await deleteGoalsByUserId(user.id);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
