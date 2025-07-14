import { Request, Response } from "express";
import { BookResult } from "../../types/bookTypes";

export default function returnBookResultsMW(_: Request, res: Response) {
	// Get book results
	const { books } = res.locals as { books: BookResult[] };

	// Return books
	res.status(200).json(books);
}
