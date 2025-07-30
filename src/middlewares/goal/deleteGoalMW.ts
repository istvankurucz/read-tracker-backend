import { Request, Response, NextFunction } from "express";
import { GoalData } from "../../types/goalTypes";
import deleteGoal from "../../services/goal/deleteGoal";

export default async function deleteGoalMW(_: Request, res: Response, next: NextFunction) {
	// Get goal
	const { goal } = res.locals as { goal: GoalData };

	try {
		// Delete goal
		await deleteGoal(goal.id);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
