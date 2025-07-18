import { Request, Response } from "express";
import { Author } from "../../types/authorTypes";

export default function returnAuthorMW(_: Request, res: Response) {
	// Get author
	const { author } = res.locals as { author: Author };

	// Return author
	res.status(200).json(author);
}
