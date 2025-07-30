import { Request, Response, NextFunction } from "express";
import { UserSelect } from "../../types/userTypes";
import { GoalData } from "../../types/goalTypes";
import getGoalData from "../../services/goal/getGoalData";

export default async function getGoalDataMW(req: Request, res: Response, next: NextFunction) {
	// Get user and goal ID
	const { user } = res.locals as { user: UserSelect };
	const { goalId } = req.params as { goalId: string };

	try {
		// Get goal
		const goal = await getGoalData(goalId, { userId: user.id });

		// Add goal to res.locals
		(res.locals.goal as GoalData) = goal;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
