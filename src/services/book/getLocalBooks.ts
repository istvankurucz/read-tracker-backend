import { eq, inArray } from "drizzle-orm";
import { BOOK_COLUMNS } from "../../constants/book/bookColumns";
import { db } from "../../drizzle/db";
import { AuthorTable } from "../../drizzle/schema/AuthorTable";
import { BookAuthorTable } from "../../drizzle/schema/BookAuthorTable";
import { BookTable } from "../../drizzle/schema/BookTable";
import { LocalBook } from "../../types/bookTypes";
import { UserTable } from "../../drizzle/schema/UserTable";
import { ReviewTable } from "../../drizzle/schema/ReviewTable";

export default async function getLocalBooks(ids: string[]): Promise<LocalBook[]> {
	// Get books
	const books = await db
		.select(BOOK_COLUMNS)
		.from(BookTable)
		.innerJoin(BookAuthorTable, eq(BookAuthorTable.bookId, BookTable.id))
		.innerJoin(AuthorTable, eq(BookAuthorTable.authorId, AuthorTable.id))
		.innerJoin(UserTable, eq(BookTable.userId, UserTable.id))
		.leftJoin(ReviewTable, eq(ReviewTable.bookId, BookTable.id))
		.where(inArray(BookTable.id, ids))
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
		);

	// Return books
	return books.map((book) => ({ ...book, source: "local" }));
}
