import { Request, Response, NextFunction } from "express";
import { Friendship } from "../../types/friendshipTypes";
import { UpdateFriendshipData } from "../../utils/friend/validation/schemas/updateFriendshipSchema";
import checkNonEmptyObject from "../../utils/general/checkNonEmptyObject";
import updateFriendship from "../../services/friendship/updateFriendship";

export default async function updateFriendshipMW(_: Request, res: Response, next: NextFunction) {
	// Get friendship and data
	const { friendship, friendshipData } = res.locals as {
		friendship: Friendship;
		friendshipData: UpdateFriendshipData;
	};

	// Check friendship data
	if (!checkNonEmptyObject(friendshipData)) return next();

	try {
		// Update friendship
		const { status } = await updateFriendship(friendship.id, friendshipData);

		// Update friendship in res.locals
		(res.locals.friendship as Friendship) = {
			...friendship,
			status,
		};

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
