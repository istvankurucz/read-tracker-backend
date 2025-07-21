import { Request, Response, NextFunction } from "express";
import { ListSelect } from "../../types/listTypes";
import { LocalBook } from "../../types/bookTypes";
import deleteListBook from "../../services/listBook/deleteListBook";

export default async function deleteListBookMW(_: Request, res: Response, next: NextFunction) {
	// Get list and book
	const { list, book } = res.locals as { list: ListSelect; book: LocalBook };

	try {
		// Delete join
		await deleteListBook({ listId: list.id, bookId: book.id });

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
