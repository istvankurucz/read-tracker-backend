import { db } from "../../drizzle/db";
import { ListBookSelect } from "../../types/listBookTypes";

export default async function getListBookJoinsByListIds(
	listIds: string[]
): Promise<ListBookSelect[]> {
	// Get list book joins
	const joins = await db.query.ListBookTable.findMany({
		where: (listBook, { inArray }) => inArray(listBook.listId, listIds),
		orderBy: (listBook, { desc }) => desc(listBook.addedAt),
	});

	// Return joins
	return joins;
}
