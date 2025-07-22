import { Request, Response, NextFunction } from "express";
import validateCreateListData from "../../utils/list/validation/validateCreateListData";
import { CreateListData } from "../../utils/list/validation/schemas/createListSchema";

export default function validateCreateListDataMW(req: Request, res: Response, next: NextFunction) {
	try {
		// Validation
		const listData = validateCreateListData(req.body);

		// Add validated data to res.locals
		(res.locals.listData as CreateListData) = listData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
