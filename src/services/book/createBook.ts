import AppError from "../../classes/AppError";
import { db } from "../../drizzle/db";
import { BookTable } from "../../drizzle/schema/BookTable";
import { BookInsert, BookSelect } from "../../types/bookTypes";

export default async function createBook(data: BookInsert): Promise<BookSelect> {
	// Create book
	const [book] = await db.insert(BookTable).values(data).returning();

	// Check book
	if (!book) throw new AppError({ message: "Error creating book." });

	// Return book
	return book;
}
