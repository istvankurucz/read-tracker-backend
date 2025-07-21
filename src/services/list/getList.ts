import AppError from "../../classes/AppError";
import { db } from "../../drizzle/db";
import { List } from "../../types/listTypes";
import getListBooksByListId from "../listBook/getListBooksByListId";

export default async function getList(id: string): Promise<List> {
	// Get list
	const list = await db.query.ListTable.findFirst({
		columns: {
			userId: false,
		},
		where: (list, { eq }) => eq(list.id, id),
	});

	// Check list
	if (!list) throw new AppError({ message: "List not found.", status: 404 });

	// Get list books
	const books = await getListBooksByListId(list.id);

	// Return list
	return { ...list, books };
}
