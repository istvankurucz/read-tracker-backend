import { Request, Response } from "express";
import { Goal } from "../../types/goalTypes";

export default function returnGoalMW(_: Request, res: Response) {
	// Get goal
	const { goal } = res.locals as { goal: Goal };

	// Return goal
	res.status(200).json(goal);
}
