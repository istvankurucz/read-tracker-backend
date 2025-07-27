import { db } from "../../drizzle/db";
import { List } from "../../types/listTypes";
import mapBooksToList from "../../utils/list/mapBooksToList";
import getLocalBooks from "../book/getLocalBooks";

export default async function getSystemListsByUserId(userId: string): Promise<List[]> {
	// Get lists
	const listsRaw = await db.query.ListTable.findMany({
		columns: {
			userId: false,
		},
		with: {
			books: {
				columns: {
					bookId: true,
				},
			},
		},
		where: (list, { and, eq }) => and(eq(list.userId, userId), eq(list.system, true)),
	});

	// Get books
	const bookIds = listsRaw.map((list) => list.books.map((book) => book.bookId)).flat();
	const books = await getLocalBooks(bookIds);

	// Get joins
	const joins = listsRaw
		.map((list) => list.books.map((book) => ({ listId: list.id, bookId: book.bookId })))
		.flat();

	// Map books to lists
	const lists = listsRaw.map((list) => mapBooksToList(list, { books, joins }));

	// Return lists
	return lists;
}
