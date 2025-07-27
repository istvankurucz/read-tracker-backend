import AppError from "../../classes/AppError";
import { SystemListName } from "../../constants/list/systemListNames";
import { db } from "../../drizzle/db";
import { List } from "../../types/listTypes";
import getListBooksByListId from "../listBook/getListBooksByListId";

export default async function getCurrentlyReadingListByUserId(userId: string): Promise<List> {
	// Get list
	const list = await db.query.ListTable.findFirst({
		columns: {
			userId: false,
		},
		where: (list, { and, eq }) =>
			and(eq(list.userId, userId), eq(list.name, "Currently Reading" as SystemListName)),
	});

	// Check list
	if (!list) throw new AppError({ message: "List not found.", status: 404 });

	// Get list books
	const books = await getListBooksByListId(list.id);

	// Return list
	return { ...list, books };
}
