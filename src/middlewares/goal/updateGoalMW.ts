import { Request, Response, NextFunction } from "express";
import { Goal } from "../../types/goalTypes";
import { UpdateGoalData } from "../../utils/goal/validation/schemas/updateGoalSchema";
import updateGoal from "../../services/goal/updateGoal";
import checkNonEmptyObject from "../../utils/general/checkNonEmptyObject";
import getGoalStatus from "../../utils/goal/getGoalStatus";
import getGoalStartAndEndDate from "../../utils/goal/getGoalStartAndEndDate";
import getReadingsByUserIdAndDate from "../../services/reading/getReadingsByUserIdAndDate";
import { User } from "../../types/userTypes";

export default async function updateGoalMW(_: Request, res: Response, next: NextFunction) {
	// Get user, goal and goal data
	const { user, goal, goalData } = res.locals as {
		user: User;
		goal: Goal;
		goalData: UpdateGoalData;
	};

	// Check goal data
	if (!checkNonEmptyObject(goalData)) return next();

	try {
		// Update goal
		const { userId, ...updatedGoal } = await updateGoal(goal.id, goalData);

		// Get goal status
		const status = getGoalStatus(updatedGoal);

		// Get goal start and end date
		const dates = getGoalStartAndEndDate(updatedGoal);

		// Get goal readings
		const readings = await getReadingsByUserIdAndDate({ userId: user.id, dates });

		// Update goal in res.locals
		(res.locals.goal as Goal) = {
			...updatedGoal,
			status,
			readings,
		};

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
