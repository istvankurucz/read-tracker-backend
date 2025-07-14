import { Request, Response, NextFunction } from "express";
import validateUpdateFriendshipData from "../../utils/friend/validation/validateUpdateFriendshipData";
import { UpdateFriendshipData } from "../../utils/friend/validation/schemas/updateFriendshipSchema";

export default function validateUpdateFriendshipDataMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		// Validation
		const friendshipData = validateUpdateFriendshipData(req.body);

		// Add user data to res.locals
		(res.locals.friendshipData as UpdateFriendshipData) = friendshipData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
