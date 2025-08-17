import { Request, Response, NextFunction } from "express";
import validateUUID from "../../utils/general/validateUUID";
import AppError from "../../classes/AppError";

export default function validateListIdMW(req: Request, _: Response, next: NextFunction) {
	// Get list ID
	const { listId } = req.params;

	try {
		// Validation
		if (!validateUUID(listId)) throw new AppError({ message: "Invalid list ID.", status: 400 });

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
