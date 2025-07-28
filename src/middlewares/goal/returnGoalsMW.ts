import { Request, Response } from "express";
import { Goal } from "../../types/goalTypes";

export default function returnGoalsMW(_: Request, res: Response) {
	// Get goal
	const { goals } = res.locals as { goals: Goal[] };

	// Return goal
	res.status(200).json(goals);
}
