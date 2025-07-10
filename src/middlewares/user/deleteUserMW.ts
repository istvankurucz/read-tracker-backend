import { Request, Response, NextFunction } from "express";
import deleteUser from "../../services/user/deleteUser";

export default async function deleteUserMW(req: Request, _: Response, next: NextFunction) {
	// Get user ID
	const { userId } = req.params as { userId: string };

	try {
		// Delete user
		await deleteUser(userId);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
