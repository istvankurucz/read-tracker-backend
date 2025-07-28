import { Request, Response, NextFunction } from "express";
import { UserSelect } from "../../types/userTypes";
import { CreateGoalData } from "../../utils/goal/validation/schemas/createGoalSchema";
import createGoal from "../../services/goal/createGoal";
import { Goal } from "../../types/goalTypes";

export default async function createGoalMW(_: Request, res: Response, next: NextFunction) {
	// Get user and goal data
	const { user, goalData } = res.locals as { user: UserSelect; goalData: CreateGoalData };

	try {
		// Create goal
		const { userId, ...goal } = await createGoal({ ...goalData, userId: user.id });

		// Add goal to res.locals
		(res.locals.goal as Goal) = goal;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
