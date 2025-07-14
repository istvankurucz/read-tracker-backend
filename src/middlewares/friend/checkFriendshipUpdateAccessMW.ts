import { Request, Response, NextFunction } from "express";
import { UserSelect } from "../../types/userTypes";
import { Friendship } from "../../types/friendshipTypes";
import checkFriendshipUpdateAccess from "../../utils/friend/validation/checkFriendshipUpdateAccess";

export default function checkFriendshipUpdateAccessMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get friendship and user from res.locals
	const { friendship, user } = res.locals as { friendship: Friendship; user: UserSelect };

	try {
		// Check access
		checkFriendshipUpdateAccess(friendship, user);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
