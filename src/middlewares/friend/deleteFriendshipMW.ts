import { Request, Response, NextFunction } from "express";
import { FriendshipSelect } from "../../types/friendshipTypes";
import deleteFriendship from "../../services/friendship/deleteFriendship";

export default async function deleteFriendshipMW(_: Request, res: Response, next: NextFunction) {
	// Get friendship from res.locals
	const { friendship } = res.locals as { friendship: FriendshipSelect };

	try {
		// Delete friendship
		await deleteFriendship(friendship.id);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
