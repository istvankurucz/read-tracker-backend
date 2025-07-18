import { check, pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { id } from "../schemaHelpers";
import { relations, sql } from "drizzle-orm";
import { BookAuthorTable } from "./BookAuthorTable";
import { UserTable } from "./UserTable";

// Schema
export const AuthorTable = pgTable(
	"author",
	{
		id,
		name: text("name").notNull(),
		userId: uuid("user_id")
			.notNull()
			.references(() => UserTable.id),
	},
	(author) => [
		check("name_min_length", sql`char_length(${author.name}) > 0`),
		uniqueIndex("unique_lower_name").on(sql`lower(${author.name})`),
	]
);

// Relations
export const AuthorTableRelations = relations(AuthorTable, ({ one, many }) => {
	return {
		user: one(UserTable, {
			fields: [AuthorTable.userId],
			references: [UserTable.id],
		}),
		books: many(BookAuthorTable),
	};
});
