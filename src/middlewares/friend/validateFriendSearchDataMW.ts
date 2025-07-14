import { Request, Response, NextFunction } from "express";
import validateFriendSearchData from "../../utils/friend/validation/validateFriendSearchData";
import { FriendSearchData } from "../../utils/friend/validation/schemas/friendSearchSchema";

export default function validateFriendSearchDataMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get query params
	const { q, limit } = req.query as { q: string; limit: string | undefined };

	try {
		// Validation
		const searchData = validateFriendSearchData({
			q,
			limit: limit == undefined ? undefined : parseInt(limit),
		});

		// Add validated data to res.locals
		(res.locals.searchData as FriendSearchData) = searchData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
