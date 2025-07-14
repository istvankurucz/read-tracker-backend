import { Request, Response } from "express";
import { FriendshipResult } from "../../types/friendshipTypes";

export default function returnFriendsResultMW(_: Request, res: Response) {
	// Get result from res.locals
	const { friendsResult } = res.locals as { friendsResult: FriendshipResult[] };

	// Send result to client
	res.status(200).json(friendsResult);
}
