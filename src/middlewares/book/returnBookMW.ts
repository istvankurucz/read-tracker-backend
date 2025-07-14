import { Request, Response } from "express";
import { Book } from "../../types/bookTypes";

export default function returnBookMW(_: Request, res: Response) {
	// Get book
	const { book } = res.locals as { book: Book };

	// Return book
	res.status(200).json(book);
}
