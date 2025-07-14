import { Request, Response } from "express";

export default function sendFriendshipDeletedResponseMW(_: Request, res: Response) {
	res.status(204).json({ message: "Friendship deleted." });
}
