import { Request, Response } from "express";
import { Friendship } from "../../types/friendshipTypes";

export default function returnFriendshipMW(_: Request, res: Response) {
	// Get friendship from res.locals
	const { friendship } = res.locals as { friendship: Friendship };

	// Return friendship
	res.status(200).json(friendship);
}
