import { Request, Response, NextFunction } from "express";
import validateUUID from "../../utils/general/validateUUID";
import AppError from "../../classes/AppError";

export default function validateUserIdMW(req: Request, _: Response, next: NextFunction) {
	// Get user ID
	const { userId } = req.params;

	try {
		// Validation
		if (!validateUUID(userId)) {
			throw new AppError({ message: "Invalid user ID.", status: 400 });
		}

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
