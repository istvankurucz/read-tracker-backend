import { Request, Response } from "express";
import { Review } from "../../types/reviewTypes";

export default function returnReviewMW(_: Request, res: Response) {
	// Get review
	const { review } = res.locals as { review: Review };

	// Return review
	res.status(200).json(review);
}
