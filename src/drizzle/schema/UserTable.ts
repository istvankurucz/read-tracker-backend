import { relations, sql } from "drizzle-orm";
import { check, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { UserBookTable } from "./UserBookTable";
import { RatingTable } from "./RatingTable";
import { ReadingTable } from "./ReadingTable";
import { GoalTable } from "./GoalTable";
import { ListTable } from "./ListTable";

// Schema
export const UserTable = pgTable(
	"user",
	{
		id: uuid("id").primaryKey(),
		name: text("name").notNull(),
	},
	(user) => [check("name_min_length", sql`char_length(${user.name}) > 0`)]
);

// Relations
export const UserTableRelations = relations(UserTable, ({ many }) => {
	return {
		// No friendship link
		books: many(UserBookTable),
		ratings: many(RatingTable),
		readings: many(ReadingTable),
		goals: many(GoalTable),
		lists: many(ListTable),
	};
});
