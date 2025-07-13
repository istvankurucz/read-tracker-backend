import { Request, Response, NextFunction } from "express";
import { UpdateUserData } from "../../utils/user/validation/schemas/updateUserSchema";
import updateUser from "../../services/user/updateUser";
import { UserSelect } from "../../types/userTypes";
import checkNonEmptyObject from "../../utils/general/checkNonEmptyObject";

export default async function updateUserMW(_: Request, res: Response, next: NextFunction) {
	// Get user data
	const { user, userData } = res.locals as { user: UserSelect; userData: UpdateUserData };

	// Check update data
	if (!checkNonEmptyObject(userData)) return next();

	try {
		// Update user
		const updatedUser = await updateUser(user.id, userData);

		// Add user to res.locals
		(res.locals.user as UserSelect) = updatedUser;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
