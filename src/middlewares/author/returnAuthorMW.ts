import { Request, Response } from "express";
import { AuthorSelect } from "../../types/authorTypes";

export default function returnAuthorMW(_: Request, res: Response) {
	// Get author
	const { author } = res.locals as { author: AuthorSelect };

	// Return author
	res.status(200).json(author);
}
