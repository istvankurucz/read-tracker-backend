import { Request, Response, NextFunction } from "express";
import { UpdateListBookData } from "../../utils/listBook/validation/schemas/updateListBooksSchema";
import validateUpdateListBooksData from "../../utils/listBook/validation/validateUpdateListBooksData";

export default function validateUpdateListBooksDataMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		// Validation
		const listBookData = validateUpdateListBooksData(req.body);

		// Add validated data to res.locals
		(res.locals.listBookData as UpdateListBookData) = listBookData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
