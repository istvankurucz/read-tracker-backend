import { Request, Response, NextFunction } from "express";
import validateUpdateBookData from "../../utils/book/validation/validateUpdateBookData";
import { UpdateBookData } from "../../utils/book/validation/schemas/updateBookSchema";

export default function validateUpdateBookDataMW(req: Request, res: Response, next: NextFunction) {
	try {
		// Validation
		const bookData = validateUpdateBookData(req.body);

		// Add validated data to res.locals
		(res.locals.bookData as UpdateBookData) = bookData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
