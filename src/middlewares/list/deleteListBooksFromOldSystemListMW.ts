import { Request, Response, NextFunction } from "express";
import { List } from "../../types/listTypes";
import deleteListBook from "../../services/listBook/deleteListBook";

export default async function deleteListBooksFromOldSystemListMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get lists, updated list and new book IDs
	const { lists, list, newBookIds } = res.locals as {
		lists: List[];
		list: List;
		newBookIds: string[];
	};

	// Check system list
	if (!list.system) return next();

	// Update system list of books
	for (const bookId of newBookIds) {
		// Get old system list of book
		const oldSystemList = lists.find((list) =>
			list.books.map((book) => book.id).includes(bookId)
		);

		// Check old system list
		if (!oldSystemList) continue;

		try {
			// Delete from old system list
			await deleteListBook({ listId: oldSystemList.id, bookId });
		} catch (err) {
			return next(err);
		}
	}

	// Go to next MW
	return next();
}
