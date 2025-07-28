import { Request, Response, NextFunction } from "express";
import validateCreateGoalData from "../../utils/goal/validation/validateCreateGoalData";
import { CreateGoalData } from "../../utils/goal/validation/schemas/createGoalSchema";

export default function validateCreateGoalDataMW(req: Request, res: Response, next: NextFunction) {
	try {
		// Validation
		const goalData = validateCreateGoalData(req.body);

		// Add validated data to res.locals
		(res.locals.goalData as CreateGoalData) = goalData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
