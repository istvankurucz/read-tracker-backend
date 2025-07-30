import { Request, Response, NextFunction } from "express";
import validateUpdateGoalData from "../../utils/goal/validation/validateUpdateGoalData";
import { UpdateGoalData } from "../../utils/goal/validation/schemas/updateGoalSchema";

export default function validateUpdateGoalDataMW(req: Request, res: Response, next: NextFunction) {
	try {
		// Validation
		const goalData = validateUpdateGoalData(req.body);

		// Add validated data to res.locals
		(res.locals.goalData as UpdateGoalData) = goalData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
