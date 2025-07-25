import { Request, Response, NextFunction } from "express";
import validateUpdateReviewData from "../../utils/review/validation/validateUpdateReviewData";
import { UpdateReviewData } from "../../utils/review/validation/schemas/updateReviewSchema";

export default function validateUpdateReviewDataMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		// Validation
		const reviewData = validateUpdateReviewData(req.body);

		// Add validated data to res.locals
		(res.locals.reviewData as UpdateReviewData) = reviewData;

		// Go to next MW
		return next();
	} catch (err) {
		return next();
	}
}
