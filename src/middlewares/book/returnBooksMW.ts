import { Request, Response } from "express";
import { Book } from "../../types/bookTypes";

export default function returnBooksMW(_: Request, res: Response) {
	// Get books
	const { books } = res.locals as { books: Book[] };

	// Return books
	res.status(200).json(books);
}
