import { Request, Response, NextFunction } from "express";
import { CreateBookData } from "../../utils/book/validation/schemas/createBookSchema";
import { BookSelect } from "../../types/bookTypes";
import { Author } from "../../types/authorTypes";
import createBookAuthor from "../../services/bookAuthor/createBookAuthor";
import getAuthorFromBookData from "../../utils/book/getAuthorFromBookData";
import { User } from "../../types/userTypes";

export default async function createBookAuthorsMW(_: Request, res: Response, next: NextFunction) {
	// Get user, book, book data, authors
	const { user, book, bookData } = res.locals as {
		user: User;
		book: BookSelect;
		bookData: CreateBookData;
	};

	// Initialize authors array
	const authors: Author[] = [];

	try {
		// Go through every author
		for (const authorData of bookData.authors) {
			// Get author based on author data
			const author = await getAuthorFromBookData(authorData, { userId: user.id });

			// Create book-author join
			await createBookAuthor({ bookId: book.id, authorId: author.id });

			// Add author to array
			authors.push(author);
		}

		// Add authors to res.locals
		(res.locals.authors as Author[]) = authors;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
