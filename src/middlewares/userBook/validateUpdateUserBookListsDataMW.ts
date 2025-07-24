import { Request, Response, NextFunction } from "express";
import validateUpdateUserBookListsData from "../../utils/userBook/validation/validateUpdateUserBookListsData";
import { UpdateUserBookListsData } from "../../utils/userBook/validation/schemas/updateUserBookListsSchema";

export default function validateUpdateUserBookListsDataMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		// Validation
		const listsData = validateUpdateUserBookListsData(req.body);

		// Add validated data to res.locals
		(res.locals.listsData as UpdateUserBookListsData) = listsData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
