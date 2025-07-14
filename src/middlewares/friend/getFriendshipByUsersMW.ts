import { Request, Response, NextFunction } from "express";
import getFriendshipByUsers from "../../services/friendship/getFriendshipByUsers";
import { UserSelect } from "../../types/userTypes";
import { FriendshipSelect } from "../../types/friendshipTypes";

export default async function getFriendshipByUsersMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get user and friend ID
	const { friendId } = req.query as { friendId: string };
	const { user } = res.locals as { user: UserSelect };

	try {
		// Get friendship
		const friendship = await getFriendshipByUsers({ id1: user.id, id2: friendId });

		// Add friendship to res.locals
		(res.locals.friendship as FriendshipSelect) = friendship;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
