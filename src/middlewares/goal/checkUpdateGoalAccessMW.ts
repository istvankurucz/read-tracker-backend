import { Request, Response, NextFunction } from "express";
import { Goal } from "../../types/goalTypes";
import AppError from "../../classes/AppError";

export default function checkUpdateGoalAccessMW(_: Request, res: Response, next: NextFunction) {
	// Get goal
	const { goal } = res.locals as { goal: Goal };

	try {
		// Check goal with status past
		if (goal.status === "past") {
			throw new AppError({ message: "Goal with status past cannot be updated.", status: 403 });
		}

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
