import { check, pgTable, text } from "drizzle-orm/pg-core";
import { id } from "../schemaHelpers";
import { relations, sql } from "drizzle-orm";
import { BookAuthorTable } from "./BookAuthorTable";

// Schema
export const AuthorTable = pgTable(
	"author",
	{
		id,
		name: text("name").notNull(),
	},
	(author) => [check("name_min_length", sql`char_length(${author.name}) > 0`)]
);

// Relations
export const AuthorTableRelations = relations(AuthorTable, ({ many }) => {
	return {
		books: many(BookAuthorTable),
	};
});
