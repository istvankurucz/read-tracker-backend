import { Request, Response, NextFunction } from "express";
import deleteBookPhotoByBookId from "../../services/book/deleteBookPhotoByBookId";
import { LocalBook } from "../../types/bookTypes";

export default async function deleteBookCoverPhotoMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get book
	const { book } = res.locals as { book: LocalBook };

	try {
		// Delete book photo
		await deleteBookPhotoByBookId(book.id);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
