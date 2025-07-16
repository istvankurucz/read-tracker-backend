import { Request, Response } from "express";
import { AuthorSelect } from "../../types/authorTypes";

export default function returnAuthorsMW(_: Request, res: Response) {
	// Get authors
	const { authors } = res.locals as { authors: AuthorSelect[] };

	// Return authors
	res.status(200).json(authors);
}
