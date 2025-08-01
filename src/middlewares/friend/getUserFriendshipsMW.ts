import { Request, Response, NextFunction } from "express";
import { UserSelect } from "../../types/userTypes";
import getFriendshipsByUserId from "../../services/friendship/getFriendshipsByUserId";
import { Friendship } from "../../types/friendshipTypes";

export default async function getUserFriendshipsMW(_: Request, res: Response, next: NextFunction) {
	// Get user from res.locals
	const { user } = res.locals as { user: UserSelect };

	try {
		// Get friendships
		const friendships = await getFriendshipsByUserId(user.id);

		// Add friendships to res.locals
		(res.locals.friendships as Friendship[]) = friendships;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
