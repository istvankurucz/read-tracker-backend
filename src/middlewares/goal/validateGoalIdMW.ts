import { Request, Response, NextFunction } from "express";
import validateUUID from "../../utils/general/validateUUID";
import AppError from "../../classes/AppError";

export default function validateGoalIdMW(req: Request, _: Response, next: NextFunction) {
	// Get goal ID
	const { goalId } = req.params;

	try {
		// Validation
		if (!validateUUID(goalId)) throw new AppError({ message: "Invalid goal ID.", status: 400 });

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
