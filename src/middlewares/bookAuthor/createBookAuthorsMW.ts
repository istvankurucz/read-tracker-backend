import { Request, Response, NextFunction } from "express";
import { CreateBookData } from "../../utils/book/validation/schemas/createBookSchema";
import { BookSelect } from "../../types/bookTypes";
import createBookAuthors from "../../services/bookAuthor/createBookAuthors";
import { AuthorSelect } from "../../types/authorTypes";
import getAuthors from "../../services/author/getAuthors";

export default async function createBookAuthorsMW(_: Request, res: Response, next: NextFunction) {
	// Get book, book data, authors
	const { book, bookData } = res.locals as {
		book: BookSelect;
		bookData: CreateBookData;
	};

	try {
		// Create book-author joins
		const bookAuthors = await createBookAuthors(book.id, bookData.authors);

		// Fetch authors
		const bookAuthorIds = bookAuthors.map((record) => record.authorId);
		const createdAuthors = await getAuthors(bookAuthorIds);

		// Add authors to res.locals
		(res.locals.authors as AuthorSelect[]) = createdAuthors;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
