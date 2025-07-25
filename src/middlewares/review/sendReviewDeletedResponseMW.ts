import { Request, Response } from "express";

export default function sendReviewDeletedResponseMW(_: Request, res: Response) {
	res.status(204).json({ message: "Review deleted." });
}
