import { and, eq, inArray } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { ListBookTable } from "../../drizzle/schema/ListBookTable";

export default async function deleteListBooks(listId: string, bookIds: string[]): Promise<void> {
	await db
		.delete(ListBookTable)
		.where(and(eq(ListBookTable.listId, listId), inArray(ListBookTable.bookId, bookIds)));
}
