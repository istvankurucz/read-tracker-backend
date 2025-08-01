import { Request, Response, NextFunction } from "express";
import { User } from "../../types/userTypes";
import deleteUserBooksByUserId from "../../services/userBook/deleteUserBooksByUserId";

export default async function deleteUserBooksMW(_: Request, res: Response, next: NextFunction) {
	// Get user
	const { user } = res.locals as { user: User };

	try {
		// Delete user book joins
		await deleteUserBooksByUserId(user.id);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
