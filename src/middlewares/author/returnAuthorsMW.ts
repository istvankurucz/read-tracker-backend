import { Request, Response } from "express";
import { Author } from "../../types/authorTypes";

export default function returnAuthorsMW(_: Request, res: Response) {
	// Get authors
	const { authors } = res.locals as { authors: Author[] };

	// Return authors
	res.status(200).json(authors);
}
