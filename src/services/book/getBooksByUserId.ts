import { desc, eq } from "drizzle-orm";
import { BOOK_COLUMNS } from "../../constants/book/bookColumns";
import { db } from "../../drizzle/db";
import { BookAuthorTable } from "../../drizzle/schema/BookAuthorTable";
import { BookTable } from "../../drizzle/schema/BookTable";
import { LocalBook } from "../../types/bookTypes";
import { AuthorTable } from "../../drizzle/schema/AuthorTable";
import { UserTable } from "../../drizzle/schema/UserTable";

export default async function getBooksByUserId(userId: string): Promise<LocalBook[]> {
	// Get user books
	const books = await db
		.select(BOOK_COLUMNS)
		.from(BookTable)
		.innerJoin(BookAuthorTable, eq(BookAuthorTable.bookId, BookTable.id))
		.innerJoin(AuthorTable, eq(BookAuthorTable.authorId, AuthorTable.id))
		.innerJoin(UserTable, eq(BookTable.userId, UserTable.id))
		.where(eq(BookTable.userId, userId))
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
		.orderBy(desc(BookTable.createdAt));

	// Return books
	return books.map((book) => ({ ...book, source: "local" }));
}
