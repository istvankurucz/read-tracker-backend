import { db } from "../../drizzle/db";
import { List } from "../../types/listTypes";
import getBooksByUserId from "../book/getBooksByUserId";
import getListBookJoinsByListIds from "../listBook/getListBookJoinsByListIds";

export default async function getListsByUserId(userId: string): Promise<List[]> {
	// Get lists
	const listsRaw = await db.query.ListTable.findMany({
		columns: {
			userId: false,
		},
		where: (list, { eq }) => eq(list.userId, userId),
	});

	// Get books
	const books = await getBooksByUserId(userId);

	// Get joins
	const listIds = listsRaw.map((list) => list.id);
	const joins = await getListBookJoinsByListIds(listIds);

	// Map books to lists
	const lists = listsRaw.map((list) => {
		// List books
		const listBookIds = joins
			.filter((join) => join.listId === list.id)
			.map((join) => join.bookId);

		return {
			...list,
			books: books.filter((book) => listBookIds.includes(book.id)),
		};
	});

	// Return lists
	return lists;
}
