import { db } from "../../drizzle/db";
import { ListBookTable } from "../../drizzle/schema/ListBookTable";
import { ListBookSelect } from "../../types/listBookTypes";

export default async function createListBooks(
	listId: string,
	bookIds: string[]
): Promise<ListBookSelect[]> {
	// Create data
	const data = bookIds.map((bookId) => ({ listId, bookId }));

	// Create joins
	const joins = await db.insert(ListBookTable).values(data).returning();

	// Return joins
	return joins;
}
