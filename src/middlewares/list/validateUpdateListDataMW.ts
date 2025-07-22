import { Request, Response, NextFunction } from "express";
import validateUpdateListData from "../../utils/list/validation/validateUpdateListData";
import { UpdateListData } from "../../utils/list/validation/schemas/updateListSchema";

export default function validateUpdateListDataMW(req: Request, res: Response, next: NextFunction) {
	try {
		// Validation
		const listData = validateUpdateListData(req.body);

		// Add validated data to res.locals
		(res.locals.listData as UpdateListData) = listData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
