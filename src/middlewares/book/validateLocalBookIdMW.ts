import { Request, Response, NextFunction } from "express";
import validateUUID from "../../utils/general/validateUUID";
import AppError from "../../classes/AppError";

export default function validateLocalBookIdMW(req: Request, _: Response, next: NextFunction) {
	// Get book ID
	const { bookId } = req.params;

	try {
		// Validation
		if (!validateUUID(bookId)) {
			throw new AppError({ message: "Invalid book ID.", status: 400 });
		}

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
