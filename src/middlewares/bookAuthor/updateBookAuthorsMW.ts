import { Request, Response, NextFunction } from "express";
import { LocalBook } from "../../types/bookTypes";
import { UpdateBookData } from "../../utils/book/validation/schemas/updateBookSchema";
import deleteBookAuthors from "../../services/bookAuthor/deleteBookAuthors";
import validateUUID from "../../utils/general/validateUUID";
import getAuthorFromBookData from "../../utils/book/getAuthorFromBookData";
import createBookAuthor from "../../services/bookAuthor/createBookAuthor";
import { Author } from "../../types/authorTypes";
import { UserSelect } from "../../types/userTypes";

export default async function updateBookAuthorsMW(_: Request, res: Response, next: NextFunction) {
	// Get user, book and book data
	const { user, book, bookData } = res.locals as {
		user: UserSelect;
		book: LocalBook;
		bookData: UpdateBookData;
	};

	// Check authors data
	if (!bookData.authors) return next();

	// Get author IDs
	const authorIds = book.authors.map((author) => author.id);

	// Filter author data
	const existingAuthorIds = bookData.authors.filter((authorData) => validateUUID(authorData));
	const newAuthorsData = bookData.authors.filter((authorData) => !validateUUID(authorData));

	// Filter authors to be added and removed
	const authorIdsToRemove = authorIds.filter((authorId) => !existingAuthorIds.includes(authorId));
	const authorsDataToAdd = [
		...newAuthorsData,
		...existingAuthorIds.filter((authorId) => !authorIds.includes(authorId)),
	];

	try {
		// Delete book-author joins
		if (authorIdsToRemove.length > 0) {
			await deleteBookAuthors(book.id, authorIdsToRemove);
		}

		// Initialize authors array for new authors
		const newAuthors: Author[] = [];

		// Go through every author who needs to be added
		for (const authorData of authorsDataToAdd) {
			// Get author based on author data
			const author = await getAuthorFromBookData(authorData, { userId: user.id });

			// Create book-author join
			await createBookAuthor({ bookId: book.id, authorId: author.id });

			// Add author to array
			newAuthors.push(author);
		}

		// Filter existing authors
		const existingAuthors = book.authors.filter((author) =>
			existingAuthorIds.includes(author.id)
		);

		// Update book in res.locals
		(res.locals.book as LocalBook) = {
			...book,
			authors: [...existingAuthors, ...newAuthors],
		};

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
