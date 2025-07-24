import { db } from "../../drizzle/db";
import { ListBookTable } from "../../drizzle/schema/ListBookTable";
import { ListBookSelect } from "../../types/listBookTypes";

export default async function createBookLists(
	bookId: string,
	listIds: string[]
): Promise<ListBookSelect[]> {
	// Create data
	const data = listIds.map((listId) => ({ bookId, listId }));

	// Create joins
	const joins = await db.insert(ListBookTable).values(data).returning();

	// Return joins
	return joins;
}
