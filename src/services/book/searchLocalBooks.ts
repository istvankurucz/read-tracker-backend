import { eq, ilike, or, sql } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { AuthorTable } from "../../drizzle/schema/AuthorTable";
import { BookTable } from "../../drizzle/schema/BookTable";
import { BookResult } from "../../types/bookTypes";
import { BookAuthorTable } from "../../drizzle/schema/BookAuthorTable";

export default async function searchLocalBooks(options: {
	q: string;
	limit?: number;
}): Promise<BookResult[]> {
	// Extract options
	const { q, limit } = options;

	// Search books
	const books = await db
		.select({
			id: BookTable.id,
			title: BookTable.title,
			subtitle: BookTable.subtitle,
			coverUrl: BookTable.coverUrl,
			authors: sql<string[]>`array_agg(${AuthorTable.name})`,
		})
		.from(BookTable)
		.innerJoin(BookAuthorTable, eq(BookAuthorTable.bookId, BookTable.id))
		.innerJoin(AuthorTable, eq(BookAuthorTable.authorId, AuthorTable.id))
		.where(
			or(
				ilike(BookTable.title, `%${q}%`),
				ilike(BookTable.subtitle, `%${q}%`),
				ilike(AuthorTable.name, `%${q}%`)
			)
		)
		.groupBy(BookTable.id, BookTable.title, BookTable.subtitle, BookTable.coverUrl)
		.limit(limit ?? 5);

	// Return books
	return books.map((book) => ({ ...book, source: "local" }));
}
