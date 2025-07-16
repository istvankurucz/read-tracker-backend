import { Request, Response, NextFunction } from "express";
import { LocalBook } from "../../types/bookTypes";
import { UpdateBookData } from "../../utils/book/validation/schemas/updateBookSchema";
import deleteBookPhotoByBookId from "../../services/book/deleteBookPhotoByBookId";
import uploadBookPhoto from "../../services/book/uploadBookPhoto";

export default async function updateBookPhotoMW(req: Request, res: Response, next: NextFunction) {
	// Get book and new photo
	const { book } = res.locals as { book: LocalBook };
	const { file } = req;

	// No file
	if (file == undefined) return next();

	try {
		// Delete book cover photo
		await deleteBookPhotoByBookId(book.id);

		// Upload new cover photo
		const { url } = await uploadBookPhoto(file, book.id);

		// Update book data in res.locals
		(res.locals.bookData as UpdateBookData).coverUrl = url;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
