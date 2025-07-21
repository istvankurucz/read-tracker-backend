import { and, eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { ListBookTable } from "../../drizzle/schema/ListBookTable";

export default async function deleteListBook(data: {
	listId: string;
	bookId: string;
}): Promise<void> {
	// Extract data
	const { listId, bookId } = data;

	// Delete join
	await db
		.delete(ListBookTable)
		.where(and(eq(ListBookTable.listId, listId), eq(ListBookTable.bookId, bookId)));
}
