import { Request, Response, NextFunction } from "express";
import validateCreateReadingData from "../../utils/reading/validation/validateCreateReadingData";
import { CreateReadingData } from "../../utils/reading/validation/schemas/createReadingSchema";

export default function validateCreateReadingDataMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		// Validation
		const readingData = validateCreateReadingData(req.body);

		// Add validated data to res.locals
		(res.locals.readingData as CreateReadingData) = readingData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
