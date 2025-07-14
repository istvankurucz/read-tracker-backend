import { Request, Response, NextFunction } from "express";
import { FriendSearchData } from "../../utils/friend/validation/schemas/friendSearchSchema";
import searchFriends from "../../services/friendship/searchFriends";
import { UserSelect } from "../../types/userTypes";
import { FriendshipResult } from "../../types/friendshipTypes";

export default async function searchFriendsMW(_: Request, res: Response, next: NextFunction) {
	// Get user and search data
	const {
		user,
		searchData: { q, limit },
	} = res.locals as { user: UserSelect; searchData: FriendSearchData };

	try {
		// Get results
		const friendsResult = await searchFriends({ userId: user.id, q, limit });

		// Add result to res.locals
		(res.locals.friendsResult as FriendshipResult[]) = friendsResult;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
