import { and, eq, or } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { BookAuthorTable } from "../../drizzle/schema/BookAuthorTable";

export default async function deleteBookAuthors(
	bookId: string,
	authorIds: string[]
): Promise<void> {
	// Delete joins
	await db
		.delete(BookAuthorTable)
		.where(
			or(
				...authorIds.map((authorId) =>
					and(eq(BookAuthorTable.bookId, bookId), eq(BookAuthorTable.authorId, authorId))
				)
			)
		);
}
