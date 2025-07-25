import { eq, sql } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { BookAuthorTable } from "../../drizzle/schema/BookAuthorTable";
import { BookTable } from "../../drizzle/schema/BookTable";
import { LocalBook } from "../../types/bookTypes";
import { AuthorTable } from "../../drizzle/schema/AuthorTable";
import { UserTable } from "../../drizzle/schema/UserTable";
import AppError from "../../classes/AppError";
import { BOOK_COLUMNS } from "../../constants/book/bookColumns";
import { ReviewTable } from "../../drizzle/schema/ReviewTable";

export default async function getLocalBook(id: string): Promise<LocalBook> {
	// Get book
	const [book] = await db
		.select(BOOK_COLUMNS)
		.from(BookTable)
		.innerJoin(BookAuthorTable, eq(BookAuthorTable.bookId, BookTable.id))
		.innerJoin(AuthorTable, eq(BookAuthorTable.authorId, AuthorTable.id))
		.innerJoin(UserTable, eq(BookTable.userId, UserTable.id))
		.leftJoin(ReviewTable, eq(ReviewTable.bookId, BookTable.id))
		.where(eq(BookTable.id, id))
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

	// Check book
	if (!book) throw new AppError({ message: "Book not found.", status: 404 });

	// Return book
	return { ...book, source: "local" };
}
