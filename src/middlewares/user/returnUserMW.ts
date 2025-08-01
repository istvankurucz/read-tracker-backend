import { Request, Response } from "express";
import { User } from "../../types/userTypes";

export default function returnUserMW(_: Request, res: Response) {
	// Get user from res.locals
	const { user } = res.locals as { user: User };

	// Send user to client
	res.status(200).json(user);
}
