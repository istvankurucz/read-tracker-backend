import { eq } from "drizzle-orm";
import { BOOK_COLUMNS } from "../../constants/book/bookColumns";
import { db } from "../../drizzle/db";
import { BookTable } from "../../drizzle/schema/BookTable";
import { UserBookTable } from "../../drizzle/schema/UserBookTable";
import { UserTable } from "../../drizzle/schema/UserTable";
import { LocalBook } from "../../types/bookTypes";

export default async function getUserBooksByUserId(userId: string): Promise<LocalBook[]> {
	// Get books
	const books = await db
		.select(BOOK_COLUMNS)
		.from(BookTable)
		.innerJoin(UserBookTable, eq(UserBookTable.bookId, BookTable.id))
		.innerJoin(UserBookTable, eq(UserBookTable.userId, UserTable.id))
		.innerJoin(UserTable, eq(BookTable.userId, UserTable.id))
		.where(eq(UserBookTable.userId, userId))
		.groupBy(
			BookTable.id,
			BookTable.title,
			BookTable.subtitle,
			BookTable.coverUrl,
			BookTable.pages,
			BookTable.language,
			BookTable.isbn,
			BookTable.genre,
			BookTable.description,
			BookTable.releaseDate,
			UserTable.id,
			UserTable.name,
			BookTable.updatedAt,
			BookTable.createdAt
		)
		.orderBy(UserBookTable.addedAt);

	// Return books
	return books.map((book) => ({ ...book, source: "local" }));
}
