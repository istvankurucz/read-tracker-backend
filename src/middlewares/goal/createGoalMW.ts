import { Request, Response, NextFunction } from "express";
import { User } from "../../types/userTypes";
import { CreateGoalData } from "../../utils/goal/validation/schemas/createGoalSchema";
import createGoal from "../../services/goal/createGoal";
import { Goal } from "../../types/goalTypes";
import getGoalStartAndEndDate from "../../utils/goal/getGoalStartAndEndDate";
import getReadingsByUserIdAndDate from "../../services/reading/getReadingsByUserIdAndDate";
import getGoalStatus from "../../utils/goal/getGoalStatus";

export default async function createGoalMW(_: Request, res: Response, next: NextFunction) {
	// Get user and goal data
	const { user, goalData } = res.locals as { user: User; goalData: CreateGoalData };

	try {
		// Create goal
		const { userId, ...goal } = await createGoal({ ...goalData, userId: user.id });

		// Get goal status
		const status = getGoalStatus(goal);

		// Get goal start and end date
		const dates = getGoalStartAndEndDate(goal);

		// Get goal readings
		const readings = await getReadingsByUserIdAndDate({ userId: user.id, dates });

		// Add goal to res.locals
		(res.locals.goal as Goal) = {
			...goal,
			status,
			readings,
		};

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
