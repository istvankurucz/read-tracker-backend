import { Request, Response } from "express";
import { Review } from "../../types/reviewTypes";

export default function returnReviewsMW(_: Request, res: Response) {
	// Get reviews
	const { reviews } = res.locals as { reviews: Review[] };

	// Return review
	res.status(200).json(reviews);
}
