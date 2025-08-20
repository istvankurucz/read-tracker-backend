import { Request, Response, NextFunction } from "express";
import { Reading } from "../../types/readingTypes";
import { ReadingSnapshot } from "../../types/readingSnapshotTypes";
import getSystemListsByUserId from "../../services/list/getSystemListsByUserId";
import { User } from "../../types/userTypes";
import AppError from "../../classes/AppError";
import createListBooks from "../../services/listBook/createListBooks";
import deleteListBook from "../../services/listBook/deleteListBook";

export default async function updateReadingSnapshotBookSystemListMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get user, reading and snapshot
	const {
		user,
		reading: { book },
		snapshot,
	} = res.locals as { user: User; reading: Reading; snapshot: ReadingSnapshot };

	// Not finished book
	if (!snapshot.finishedBook) return next();

	try {
		// Get system lists of user
		const systemLists = await getSystemListsByUserId(user.id);

		// Get book system list
		const bookSystemList = systemLists.find((list) =>
			list.books.map((book) => book.id).includes(book.id)
		);

		// Add book to Finished list
		if (!bookSystemList || bookSystemList.name !== "Finished") {
			// Get finished list
			const finishedList = systemLists.find((list) => list.name === "Finished");
			if (!finishedList) throw new AppError({ message: "Finished system list not found." });

			// Add book to list
			await createListBooks(finishedList.id, [book.id]);
		}

		// Remove book from other system list
		if (bookSystemList && bookSystemList.name !== "Finished") {
			await deleteListBook({ listId: bookSystemList.id, bookId: book.id });
		}

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
