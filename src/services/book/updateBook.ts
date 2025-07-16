import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { BookTable } from "../../drizzle/schema/BookTable";
import { BookSelect, BookUpdate } from "../../types/bookTypes";
import AppError from "../../classes/AppError";

export default async function updateBook(id: string, data: BookUpdate): Promise<BookSelect> {
	// Update book
	const [book] = await db.update(BookTable).set(data).where(eq(BookTable.id, id)).returning();

	// Check book
	if (!book) throw new AppError({ message: "Error updating book" });

	// Return book
	return book;
}
