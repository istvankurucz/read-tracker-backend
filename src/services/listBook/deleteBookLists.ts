import { and, eq, inArray } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { ListBookTable } from "../../drizzle/schema/ListBookTable";

export default async function deleteBookLists(bookId: string, listIds: string[]): Promise<void> {
	await db
		.delete(ListBookTable)
		.where(and(eq(ListBookTable.bookId, bookId), inArray(ListBookTable.listId, listIds)));
}
