import AppError from "../../classes/AppError";
import { db } from "../../drizzle/db";
import { ListWithUserId } from "../../types/listTypes";
import getListBooksByListId from "../listBook/getListBooksByListId";

export default async function getListWithUserId(id: string): Promise<ListWithUserId> {
	// Get list
	const list = await db.query.ListTable.findFirst({
		where: (list, { eq }) => eq(list.id, id),
	});

	// Check list
	if (!list) throw new AppError({ message: "List not found.", status: 404 });

	// Get list books
	const books = await getListBooksByListId(list.id);

	// Return list
	return { ...list, books };
}
