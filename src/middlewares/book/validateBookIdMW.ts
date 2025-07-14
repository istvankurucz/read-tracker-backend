import { Request, Response, NextFunction } from "express";
import AppError from "../../classes/AppError";

export default function validateBookIdMW(req: Request, res: Response, next: NextFunction) {
	// Get book ID
	const { bookId } = req.params;

	try {
		// Validation
		if (!bookId) throw new AppError({ message: "Book ID missing.", status: 400 });

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
