import { Request, Response, NextFunction } from "express";
import validateBookSearchData from "../../utils/book/validation/validateBookSearchData";
import { BookSearchData } from "../../utils/book/validation/schemas/bookSearchSchema";

export default function validateBookSearchDataMW(req: Request, res: Response, next: NextFunction) {
	// Get query params
	const { q, limit } = req.query as { q: string; limit: string };

	try {
		// Validation
		const searchData = validateBookSearchData({
			q,
			limit: limit === "undefined" ? undefined : parseInt(limit),
		});

		// Add validated data to res.locals
		(res.locals.searchData as BookSearchData) = searchData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
