import { sql } from "drizzle-orm";
import { BookTable } from "../../drizzle/schema/BookTable";
import { Author } from "../../types/authorTypes";
import { AuthorTable } from "../../drizzle/schema/AuthorTable";
import { UserTable } from "../../drizzle/schema/UserTable";

export const BOOK_COLUMNS = {
	id: BookTable.id,
	title: BookTable.title,
	subtitle: BookTable.subtitle,
	authors: sql<
		Author[]
	>`array_agg(json_build_object('id', ${AuthorTable.id}, 'name', ${AuthorTable.name}))`,
	coverUrl: BookTable.coverUrl,
	pages: BookTable.pages,
	language: BookTable.language,
	isbn: BookTable.isbn,
	genre: BookTable.genre,
	description: BookTable.description,
	releaseDate: BookTable.releaseDate,
	user: {
		id: UserTable.id,
		name: UserTable.name,
	},
	updatedAt: BookTable.updatedAt,
	createdAt: BookTable.createdAt,
} as const;
