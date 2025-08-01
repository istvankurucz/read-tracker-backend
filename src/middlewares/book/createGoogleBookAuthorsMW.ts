import { Request, Response, NextFunction } from "express";
import { Book, BookSelect } from "../../types/bookTypes";
import { Author } from "../../types/authorTypes";
import getAuthorFromBookData from "../../utils/book/getAuthorFromBookData";
import createBookAuthor from "../../services/bookAuthor/createBookAuthor";
import { User } from "../../types/userTypes";

export default async function createGoogleBookAuthorsMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get user, book, book data
	const { user, book, bookData } = res.locals as {
		user: User;
		book: BookSelect;
		bookData: Book;
	};

	// Check local book
	if (bookData.source === "local") return next();

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
