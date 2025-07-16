import { Request, Response, NextFunction } from "express";
import validateCreateBookData from "../../utils/book/validation/validateCreateBookData";
import { CreateBookData } from "../../utils/book/validation/schemas/createBookSchema";

export default function validateCreateBookDataMW(req: Request, res: Response, next: NextFunction) {
	try {
		// Validation
		const bookData = validateCreateBookData(req.body);

		// Add validated data to res.locals
		(res.locals.bookData as CreateBookData) = bookData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
