import { Request, Response, NextFunction } from "express";
import validateCreateFriendshipData from "../../utils/friend/validation/validateCreateFriendshipData";
import { CreateFriendshipData } from "../../utils/friend/validation/schemas/createFriendshipSchema";

export default function validateCreateFriendshipDataMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		// Validation
		const friendshipData = validateCreateFriendshipData(req.body);

		// Add user data to res.locals
		(res.locals.friendshipData as CreateFriendshipData) = friendshipData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
