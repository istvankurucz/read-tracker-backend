import { Request, Response, NextFunction } from "express";
import { User } from "../../types/userTypes";
import getGoalsByUserId from "../../services/goal/getGoalsByUserId";
import { Goal } from "../../types/goalTypes";

export default async function getUserGoalsMW(_: Request, res: Response, next: NextFunction) {
	// Get user
	const { user } = res.locals as { user: User };

	try {
		// Get goals
		const goals = await getGoalsByUserId(user.id);

		// Add goals to res.locals
		(res.locals.goals as Goal[]) = goals;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
