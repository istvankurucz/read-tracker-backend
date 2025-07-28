import { Request, Response, NextFunction } from "express";
import { UserSelect } from "../../types/userTypes";
import getGoal from "../../services/goal/getGoal";
import { Goal } from "../../types/goalTypes";

export default async function getGoalMW(req: Request, res: Response, next: NextFunction) {
	// Get user and goal ID
	const { user } = res.locals as { user: UserSelect };
	const { goalId } = req.params as { goalId: string };

	try {
		// Get goal
		const goal = await getGoal(goalId, { userId: user.id });

		// Add goal to res.locals
		(res.locals.goal as Goal) = goal;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
