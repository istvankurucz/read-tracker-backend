import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { BookTable } from "../../drizzle/schema/BookTable";

export default async function deleteBook(id: string): Promise<void> {
	await db.delete(BookTable).where(eq(BookTable.id, id));
}
