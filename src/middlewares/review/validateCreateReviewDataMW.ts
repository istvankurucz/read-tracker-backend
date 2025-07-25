import { Request, Response, NextFunction } from "express";
import validateCreateReviewData from "../../utils/review/validation/validateCreateReviewData";
import { CreateReviewData } from "../../utils/review/validation/schemas/createReviewSchema";

export default function validateCreateReviewDataMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		// Validation
		const reviewData = validateCreateReviewData(req.body);

		// Add validated data to res.locals
		(res.locals.reviewData as CreateReviewData) = reviewData;

		// Go to next MW
		return next();
	} catch (err) {
		return next();
	}
}
