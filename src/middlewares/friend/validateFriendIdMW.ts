import { Request, Response, NextFunction } from "express";
import validateUUID from "../../utils/general/validateUUID";
import AppError from "../../classes/AppError";

export default function validateFriendIdMW(req: Request, _: Response, next: NextFunction) {
	// Get friend ID
	const { friendId } = req.query;

	try {
		// Validation
		if (!validateUUID(friendId)) {
			throw new AppError({ message: "Invalid friend ID.", status: 400 });
		}

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
