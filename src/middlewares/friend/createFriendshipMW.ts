import { Request, Response, NextFunction } from "express";
import { User } from "../../types/userTypes";
import { CreateFriendshipData } from "../../utils/friend/validation/schemas/createFriendshipSchema";
import createFriendship from "../../services/friendship/createFriendship";
import { Friendship } from "../../types/friendshipTypes";
import getUser from "../../services/user/getUser";

export default async function createFriendshipMW(_: Request, res: Response, next: NextFunction) {
	// Get user ID and addressee ID
	const { user, friendshipData } = res.locals as {
		user: User;
		friendshipData: CreateFriendshipData;
	};

	try {
		// Create friendship
		const { requesterId, addresseeId, ...friendship } = await createFriendship({
			requesterId: user.id,
			addresseeId: friendshipData.addresseeId,
		});

		// Get addresse data
		const addressee = await getUser(addresseeId);

		// Add friendship to res.locals
		(res.locals.friendship as Friendship) = {
			...friendship,
			requester: user,
			addressee,
		};

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
