import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { BookTable } from "./BookTable";
import { AuthorTable } from "./AuthorTable";
import { relations } from "drizzle-orm";

// Schema
export const BookAuthorTable = pgTable(
	"book_author",
	{
		bookId: uuid("book_id")
			.notNull()
			.references(() => BookTable.id, { onDelete: "cascade" }),
		authorId: uuid("author_id")
			.notNull()
			.references(() => AuthorTable.id, { onDelete: "cascade" }),
	},
	(bookAuthor) => [primaryKey({ columns: [bookAuthor.bookId, bookAuthor.authorId] })]
);

// Relations
export const BookAuthorTableRelations = relations(BookAuthorTable, ({ one }) => {
	return {
		book: one(BookTable, {
			fields: [BookAuthorTable.bookId],
			references: [BookTable.id],
		}),
		author: one(AuthorTable, {
			fields: [BookAuthorTable.authorId],
			references: [AuthorTable.id],
		}),
	};
});
