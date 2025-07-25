import { check, integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { relations, sql } from "drizzle-orm";
import { BookAuthorTable } from "./BookAuthorTable";
import { UserBookTable } from "./UserBookTable";
import { ReviewTable } from "./ReviewTable";
import { ReadingTable } from "./ReadingTable";
import { ListBookTable } from "./ListBookTable";
import { languageCodeOptions } from "../../constants/book/languageConstants";
import { UserTable } from "./UserTable";

// Enums
export const languageEnum = pgEnum("book_language", languageCodeOptions);

// Schema
export const BookTable = pgTable(
	"book",
	{
		id,
		title: text("title").notNull(),
		subtitle: text("subtitle"),
		coverUrl: text("cover_url").notNull(),
		pages: integer("pages").notNull(),
		language: languageEnum("language").notNull(),
		isbn: text("isbn"),
		genre: text("genre"),
		description: text("description"),
		releaseDate: timestamp("release_date"),
		userId: uuid("user_id")
			.notNull()
			.references(() => UserTable.id),
		updatedAt,
		createdAt,
	},
	(book) => [
		check("title_min_length", sql`char_length(${book.title}) > 0`),
		check(
			"subtitle_min_length",
			sql`${book.subtitle} IS NULL OR char_length(${book.subtitle}) > 0`
		),
		check("cover_url_min_length", sql`char_length(${book.coverUrl}) > 0`),
		check("pages_positive", sql`${book.pages} > 0`),
		check(
			"release_date_not_future",
			sql`${book.releaseDate} IS NULL OR ${book.releaseDate} <= now()`
		),
	]
);

// Relations
export const BookTableRelations = relations(BookTable, ({ one, many }) => {
	return {
		authors: many(BookAuthorTable),
		user: one(UserTable, {
			fields: [BookTable.userId],
			references: [UserTable.id],
		}),
		users: many(UserBookTable),
		reviews: many(ReviewTable),
		readings: many(ReadingTable),
		lists: many(ListBookTable),
	};
});
