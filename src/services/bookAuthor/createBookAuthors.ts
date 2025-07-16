import { db } from "../../drizzle/db";
import { BookAuthorTable } from "../../drizzle/schema/BookAuthorTable";
import { BookAuthorSelect } from "../../types/bookAuthorTypes";

export default async function createBookAuthors(
	bookId: string,
	authorIds: string[]
): Promise<BookAuthorSelect[]> {
	// Create book author data
	const data = authorIds.map((authorId) => ({ bookId, authorId }));

	// Create joins
	const bookAuthors = await db.insert(BookAuthorTable).values(data).returning();

	// Return book authors
	return bookAuthors;
}
