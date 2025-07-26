import { Request, Response, NextFunction } from "express";
import validateUpdateReadingData from "../../utils/reading/validation/validateUpdateReadingData";
import { UpdateReadingData } from "../../utils/reading/validation/schemas/updateReadingSchema";

export default function validateUpdateReadingDataMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		// Validation
		const readingData = validateUpdateReadingData(req.body);

		// Add validated data to res.locals
		(res.locals.readingData as UpdateReadingData) = readingData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
