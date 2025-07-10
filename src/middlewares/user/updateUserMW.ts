import { Request, Response, NextFunction } from "express";
import { UpdateUserData } from "../../utils/user/validation/schemas/updateUserSchema";
import updateUser from "../../services/user/updateUser";
import { UserSelect } from "../../types/userTypes";
import checkNonEmptyObject from "../../utils/general/checkNonEmptyObject";
import getUser from "../../services/user/getUser";

export default async function updateUserMW(req: Request, res: Response, next: NextFunction) {
	// Get user ID and user data
	const { userId } = req.params as { userId: string };
	const { userData } = res.locals as { userData: UpdateUserData };

	try {
		// Update user
		const user = checkNonEmptyObject(userData)
			? await updateUser(userId, userData)
			: await getUser(userId);

		// Add user to res.locals
		(res.locals.user as UserSelect) = user;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
