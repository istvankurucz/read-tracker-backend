import { Request, Response, NextFunction } from "express";
import { CreateBookData } from "../../utils/book/validation/schemas/createBookSchema";
import { BookSelect } from "../../types/bookTypes";
import { AuthorSelect } from "../../types/authorTypes";
import createBookAuthor from "../../services/bookAuthor/createBookAuthor";
import getAuthorFromBookData from "../../utils/book/getAuthorFromBookData";

export default async function createBookAuthorsMW(_: Request, res: Response, next: NextFunction) {
	// Get book, book data, authors
	const { book, bookData } = res.locals as {
		book: BookSelect;
		bookData: CreateBookData;
	};

	// Initialize authors array
	const authors: AuthorSelect[] = [];

	try {
		// Go through every author
		for (const authorData of bookData.authors) {
			// Get author based on author data
			const author = await getAuthorFromBookData(authorData);

			// Create book-author join
			await createBookAuthor({ bookId: book.id, authorId: author.id });

			// Add author to array
			authors.push(author);
		}

		// Add authors to res.locals
		(res.locals.authors as AuthorSelect[]) = authors;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
