import { Request, Response, NextFunction } from "express";
import { User } from "../../types/userTypes";
import updateUser from "../../services/user/updateUser";

export default async function deleteUserMW(_: Request, res: Response, next: NextFunction) {
	// Get user
	const { user } = res.locals as { user: User };

	try {
		// Update user's deletedAt field
		await updateUser(user.id, { deletedAt: new Date() });

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
