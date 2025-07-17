import { Request, Response, NextFunction } from "express";
import { CreateBookData } from "../../utils/book/validation/schemas/createBookSchema";
import { BookSelect } from "../../types/bookTypes";
import createBookAuthors from "../../services/bookAuthor/createBookAuthors";
import { AuthorSelect } from "../../types/authorTypes";
import getAuthors from "../../services/author/getAuthors";
import validateUUID from "../../utils/general/validateUUID";
import getAuthor from "../../services/author/getAuthor";
import createBookAuthor from "../../services/bookAuthor/createBookAuthor";
import getAuthorByName from "../../services/author/getAuthorByName";
import AppError from "../../classes/AppError";
import createAuthor from "../../services/author/createAuthor";
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
