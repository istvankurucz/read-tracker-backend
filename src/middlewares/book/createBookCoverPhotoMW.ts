import { Request, Response, NextFunction } from "express";
import { BookSelect } from "../../types/bookTypes";
import { CreateBookData } from "../../utils/book/validation/schemas/createBookSchema";
import uploadBookPhoto from "../../services/book/uploadBookPhoto";

export default async function createBookCoverPhotoMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get photo and book
	const { book } = res.locals as { book: BookSelect };
	const { file } = req;

	// No file
	if (!file) return next();

	try {
		// Upload photo
		const { url } = await uploadBookPhoto(file, book.id);

		// Update user data in res.locals
		(res.locals.bookData as CreateBookData).coverUrl = url;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
