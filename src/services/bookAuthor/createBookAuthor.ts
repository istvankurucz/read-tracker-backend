import AppError from "../../classes/AppError";
import { db } from "../../drizzle/db";
import { BookAuthorTable } from "../../drizzle/schema/BookAuthorTable";
import { BookAuthorSelect } from "../../types/bookAuthorTypes";

export default async function createBookAuthor(data: {
	bookId: string;
	authorId: string;
}): Promise<BookAuthorSelect> {
	// Create join
	const [bookAuthor] = await db.insert(BookAuthorTable).values(data).returning();

	// Check join
	if (!bookAuthor) throw new AppError({ message: "Error creating book author." });

	// Return book authors
	return bookAuthor;
}
