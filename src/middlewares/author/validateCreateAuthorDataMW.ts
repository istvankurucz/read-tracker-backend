import { Request, Response, NextFunction } from "express";
import validateCreateAuthorData from "../../utils/author/validation/validateCreateAuthorData";
import { CreateAuthorData } from "../../utils/author/validation/schemas/createAuthorSchema";

export default function validateCreateAuthorDataMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		// Validation
		const authorData = validateCreateAuthorData(req.body);

		// Add validated data to res.locals
		(res.locals.authorData as CreateAuthorData) = authorData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
