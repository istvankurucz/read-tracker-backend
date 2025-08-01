import { Request, Response, NextFunction } from "express";
import { User } from "../../types/userTypes";
import deleteFriendshipsByUserId from "../../services/friendship/deleteFriendshipsByUserId";

export default async function deleteUserFriendshipsMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get user
	const { user } = res.locals as { user: User };

	try {
		// Delete friendships
		await deleteFriendshipsByUserId(user.id);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
