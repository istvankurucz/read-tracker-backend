import { check, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { relations, sql } from "drizzle-orm";
import { BookAuthorTable } from "./BookAuthorTable";
import { UserBookTable } from "./UserBookTable";
import { RatingTable } from "./RatingTable";
import { ReadingTable } from "./ReadingTable";
import { ListBookTable } from "./ListBookTable";

// Schema
export const BookTable = pgTable(
	"book",
	{
		id,
		title: text("title").notNull(),
		subtitle: text("subtitle"),
		coverUrl: text("cover_url").notNull(),
		pages: integer("pages").notNull(),
		genre: text("genre"),
		description: text("description"),
		releaseDate: timestamp("release_date"),
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
export const BookTableRelations = relations(BookTable, ({ many }) => {
	return {
		authors: many(BookAuthorTable),
		users: many(UserBookTable),
		ratings: many(RatingTable),
		readings: many(ReadingTable),
		lists: many(ListBookTable),
	};
});
