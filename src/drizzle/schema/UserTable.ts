import { relations, sql } from "drizzle-orm";
import { check, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { UserBookTable } from "./UserBookTable";
import { ReviewTable } from "./ReviewTable";
import { ReadingTable } from "./ReadingTable";
import { GoalTable } from "./GoalTable";
import { ListTable } from "./ListTable";
import { BookTable } from "./BookTable";
import { AuthorTable } from "./AuthorTable";

// Schema
export const UserTable = pgTable(
	"user",
	{
		id: uuid("id").primaryKey(),
		name: text("name").notNull(),
		deletedAt: timestamp("deleted_at"),
	},
	(user) => [check("name_min_length", sql`char_length(${user.name}) > 0`)]
);

// Relations
export const UserTableRelations = relations(UserTable, ({ many }) => {
	return {
		// No friendship link
		booksAdded: many(BookTable),
		authorsAdded: many(AuthorTable),
		books: many(UserBookTable),
		reviews: many(ReviewTable),
		readings: many(ReadingTable),
		goals: many(GoalTable),
		lists: many(ListTable),
	};
});
