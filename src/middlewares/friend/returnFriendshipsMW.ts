import { Request, Response } from "express";
import { Friendship } from "../../types/friendshipTypes";

export default function returnFriendshipsMW(_: Request, res: Response) {
	// Get friendships from res.locals
	const { friendships } = res.locals as { friendships: Friendship[] };

	// Return friendships
	res.status(200).json(friendships);
}
