import { desc, eq } from "drizzle-orm";
import { BOOK_COLUMNS } from "../../constants/book/bookColumns";
import { db } from "../../drizzle/db";
import { ListBookTable } from "../../drizzle/schema/ListBookTable";
import { ListTable } from "../../drizzle/schema/ListTable";
import { LocalBook } from "../../types/bookTypes";
import { BookTable } from "../../drizzle/schema/BookTable";
import { BookAuthorTable } from "../../drizzle/schema/BookAuthorTable";
import { AuthorTable } from "../../drizzle/schema/AuthorTable";
import { UserTable } from "../../drizzle/schema/UserTable";

export default async function getListBooksByListId(listId: string): Promise<LocalBook[]> {
	// Get books
	const books = await db
		.select(BOOK_COLUMNS)
		.from(ListBookTable)
		.innerJoin(ListTable, eq(ListBookTable.listId, ListTable.id))
		.innerJoin(BookTable, eq(ListBookTable.bookId, BookTable.id))
		.innerJoin(BookAuthorTable, eq(BookAuthorTable.bookId, BookTable.id))
		.innerJoin(AuthorTable, eq(BookAuthorTable.authorId, AuthorTable.id))
		.innerJoin(UserTable, eq(BookTable.userId, UserTable.id))
		.where(eq(ListBookTable.listId, listId))
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
			BookTable.createdAt,
			ListBookTable.addedAt
		)
		.orderBy(desc(ListBookTable.addedAt));

	// Return books
	return books.map((book) => ({ ...book, source: "local" }));
}
