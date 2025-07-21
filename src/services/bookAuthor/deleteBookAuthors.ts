import { and, eq, inArray, or } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { BookAuthorTable } from "../../drizzle/schema/BookAuthorTable";

export default async function deleteBookAuthors(
	bookId: string,
	authorIds: string[]
): Promise<void> {
	// Delete joins
	await db
		.delete(BookAuthorTable)
		.where(and(eq(BookAuthorTable.bookId, bookId), inArray(BookAuthorTable.authorId, authorIds)));
}
