import { Request, Response, NextFunction } from "express";
import { UserSelect } from "../../types/userTypes";
import getFriendship from "../../services/friendship/getFriendship";
import AppError from "../../classes/AppError";
import { Friendship } from "../../types/friendshipTypes";

export default async function getFriendshipMW(req: Request, res: Response, next: NextFunction) {
	// Get friendship ID from and user
	const { friendshipId } = req.params as { friendshipId: string };
	const { user } = res.locals as { user: UserSelect };

	try {
		// Get friendship
		const friendship = await getFriendship(friendshipId);

		// Check friendship access
		if (friendship.requester.id !== user.id && friendship.addressee.id !== user.id) {
			throw new AppError({ message: "Friendship not found.", status: 404 });
		}

		// Add friendship to res.locals
		(res.locals.friendship as Friendship) = friendship;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
