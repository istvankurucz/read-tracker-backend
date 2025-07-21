import { Request, Response, NextFunction } from "express";
import { List, ListSelect, ListWithUserId } from "../../types/listTypes";
import { UpdateListBookData } from "../../utils/listBook/validation/schemas/updateListBooksSchema";
import createListBooks from "../../services/listBook/createListBooks";
import getLocalBooks from "../../services/book/getLocalBooks";
import getIdsToAddAndRemove from "../../utils/general/getIdsToAddAndRemove";
import deleteListBooks from "../../services/listBook/deleteListBooks";

export default async function updateListBooksMW(_: Request, res: Response, next: NextFunction) {
	// Get list and book IDs
	const {
		list: { userId, ...list },
		listBookData,
	} = res.locals as {
		list: ListWithUserId;
		listBookData: UpdateListBookData;
	};

	// Get list's book IDs
	const bookIds = list.books.map((book) => book.id);

	// Get IDs to add and remove
	const { add: bookIdsToAdd, remove: bookIdsToRemove } = getIdsToAddAndRemove({
		current: bookIds,
		new: listBookData.bookIds,
	});

	try {
		// Delete joins
		if (bookIdsToRemove.length > 0) {
			await deleteListBooks(list.id, bookIdsToRemove);
		}

		// Create joins
		if (bookIdsToAdd.length > 0) {
			await createListBooks(list.id, bookIdsToAdd);
		}

		// Get books
		const newBookIds = [
			...bookIds.filter((id) => !bookIdsToRemove.includes(id)),
			...bookIdsToAdd,
		];
		const books = await getLocalBooks(newBookIds);

		// Update list in res.locals
		(res.locals.list as List) = {
			...list,
			books,
		};

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
