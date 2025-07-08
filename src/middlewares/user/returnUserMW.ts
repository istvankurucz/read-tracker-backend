import { Request, Response } from "express";
import { UserSelect } from "../../types/userTypes";

export default function returnUserMW(_: Request, res: Response) {
	// Get user from res.locals
	const { user } = res.locals as { user: UserSelect };

	// Send user to client
	res.status(200).json(user);
}
