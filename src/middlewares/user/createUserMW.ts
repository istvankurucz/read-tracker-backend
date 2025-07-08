import { NextFunction, Request, Response } from "express";
import { CreateUserData } from "../../utils/user/validation/schemas/createUserSchema";
import { UserSelect } from "../../types/userTypes";
import createUser from "../../services/user/createUser";

export default async function createUserMW(_: Request, res: Response, next: NextFunction) {
	// Get user data from res.locals
	const { userData } = res.locals as { userData: CreateUserData };

	try {
		// Create user in DB
		const user = await createUser(userData);

		// Add user to res.locals
		(res.locals.user as UserSelect) = user;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
