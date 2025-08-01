import { Request, Response, NextFunction } from "express";
import { User } from "../../types/userTypes";
import deleteReadingsByUserId from "../../services/reading/deleteReadingsByUserId";

export default async function deleteUserReadingsMW(_: Request, res: Response, next: NextFunction) {
	// Get user
	const { user } = res.locals as { user: User };

	try {
		// Delete user book joins
		await deleteReadingsByUserId(user.id);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
