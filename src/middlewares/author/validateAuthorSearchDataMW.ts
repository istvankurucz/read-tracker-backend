import { Request, Response, NextFunction } from "express";
import validateAuthorSearchData from "../../utils/author/validation/validateAuthorSearchData";
import { AuthorSearchData } from "../../utils/author/validation/schemas/authorSearchSchemas";

export default function validateAuthorSearchDataMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get query params
	const { q, limit } = req.query as { q: string; limit: string };

	try {
		// Validation
		const searchData = validateAuthorSearchData({
			q,
			limit: limit === "undefined" ? undefined : parseInt(limit),
		});

		// Add validated data to res.locals
		(res.locals.searchData as AuthorSearchData) = searchData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
