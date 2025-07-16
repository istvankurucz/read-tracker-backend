import { Request, Response, NextFunction } from "express";
import { LocalBook } from "../../types/bookTypes";
import { UpdateBookData } from "../../utils/book/validation/schemas/updateBookSchema";
import deleteBookAuthors from "../../services/bookAuthor/deleteBookAuthors";
import createBookAuthors from "../../services/bookAuthor/createBookAuthors";
import getAuthors from "../../services/author/getAuthors";
import getIdsToAddAndRemove from "../../utils/author/getIdsToAddAndRemove";

export default async function updateBookAuthorsMW(_: Request, res: Response, next: NextFunction) {
	// Get book and book data
	const { book, bookData } = res.locals as { book: LocalBook; bookData: UpdateBookData };

	// Check authors data
	if (!bookData.authors || bookData.authors.length === 0) return next();

	// Get author IDs
	const authorIds = book.authors.map((author) => author.id);

	// Filter authors to be removed
	const { add: authorIdsToAdd, remove: authorIdsToRemove } = getIdsToAddAndRemove({
		current: authorIds,
		new: bookData.authors,
	});

	try {
		// Delete book-author joins
		await deleteBookAuthors(book.id, authorIdsToRemove);

		// Create book-author joins
		const newBookAuthors = await createBookAuthors(book.id, authorIdsToAdd);

		// Fetch authors
		const newBookAuthorIds = newBookAuthors.map((record) => record.authorId);
		const createdAuthors = await getAuthors(newBookAuthorIds);

		// Get new author
		const newAuthors = [
			...book.authors.filter((author) => !authorIdsToRemove.includes(author.id)),
			...createdAuthors,
		];

		// Update book in res.locals
		(res.locals.book as LocalBook) = {
			...book,
			authors: newAuthors,
		};

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
