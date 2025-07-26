import { Request, Response, NextFunction } from "express";
import { List } from "../../types/listTypes";
import { UpdateUserBookListsData } from "../../utils/userBook/validation/schemas/updateUserBookListsSchema";
import { LocalBook } from "../../types/bookTypes";
import getIdsToAddAndRemove from "../../utils/general/getIdsToAddAndRemove";
import deleteBookLists from "../../services/listBook/deleteBookLists";
import createBookLists from "../../services/listBook/createBookLists";

export default async function updateUserBookListsMW(_: Request, res: Response, next: NextFunction) {
	// Get book, lists and lists data
	const { book, lists, listsData } = res.locals as {
		book: LocalBook;
		lists: List[];
		listsData: UpdateUserBookListsData;
	};

	// Add lists to res.locals before update
	(res.locals.oldLists as List[]) = lists;

	// Get book system list
	const bookSystemList = lists.find(
		(list) => list.system && list.books.map((book) => book.id).includes(book.id)
	);

	// Check same system list
	const sameSystemList =
		listsData.systemListId != null && bookSystemList?.id === listsData.systemListId; // FALSE if there is no system list

	// Get book custom lists
	const bookCustomListIds = lists
		.filter((list) => !list.system && list.books.map((book) => book.id).includes(book.id))
		.map((list) => list.id);

	// Get custom list IDs to be added and removed
	const { add: customListIdsToAdd, remove: customListIdsToRemove } = getIdsToAddAndRemove({
		current: bookCustomListIds,
		new: listsData.customListIds,
	});

	try {
		// List IDs to be removed
		const listIdsToRemove =
			bookSystemList && !sameSystemList
				? [bookSystemList.id, ...customListIdsToRemove]
				: customListIdsToRemove;

		// List IDs to be added
		const listIdsToAdd =
			listsData.systemListId != null && !sameSystemList
				? [listsData.systemListId, ...customListIdsToAdd]
				: customListIdsToAdd;

		// Delete list-book joins
		if (listIdsToRemove.length > 0) await deleteBookLists(book.id, listIdsToRemove);

		// Create list-book joins
		if (listIdsToAdd.length > 0) await createBookLists(book.id, listIdsToAdd);

		// Update list books
		const newLists = lists.map((list) => {
			// Book removed
			if (listIdsToRemove.includes(list.id)) {
				// Remove book from list
				const listBooks = list.books.filter((b) => b.id !== book.id);

				// Return list
				return { ...list, books: listBooks };
			}

			// Book added
			if (listIdsToAdd.includes(list.id)) {
				// Add book to list
				const listBooks = [...list.books, book];

				// Return list
				return { ...list, books: listBooks };
			}

			// No change
			return list;
		});

		// Update lists in res.locals
		(res.locals.lists as List[]) = newLists;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
