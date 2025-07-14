import { Request, Response, NextFunction } from "express";
import validateUUID from "../../utils/general/validateUUID";
import AppError from "../../classes/AppError";

export default function validateFriendshipIdMW(req: Request, _: Response, next: NextFunction) {
	// Get friendship ID
	const { friendshipId } = req.params;

	try {
		// Validation
		if (!validateUUID(friendshipId)) {
			throw new AppError({ message: "Invalid friendship ID.", status: 400 });
		}

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
