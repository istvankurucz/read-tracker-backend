import { Request, Response, NextFunction } from "express";
import deleteAuthUser from "../../services/auth/deleteAuthUser";

export default async function deleteAuthUserMW(req: Request, _: Response, next: NextFunction) {
	// Get user ID
	const { userId } = req.params as { userId: string };

	try {
		// Delete user from Supabase Auth
		await deleteAuthUser(userId);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
