import { Request, Response, NextFunction } from "express";
import getUser from "../../services/user/getUser";
import { User } from "../../types/userTypes";

export default async function getUserMW(req: Request, res: Response, next: NextFunction) {
	// Get user ID
	const { userId } = req.params as { userId: string };

	try {
		// Get user
		const user = await getUser(userId);

		// Add user to res.locals
		(res.locals.user as User) = user;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
