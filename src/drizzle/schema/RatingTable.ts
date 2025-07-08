import { boolean, check, pgTable, real, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { id } from "../schemaHelpers";
import { UserTable } from "./UserTable";
import { BookTable } from "./BookTable";
import { relations, sql } from "drizzle-orm";

// Schema
export const RatingTable = pgTable(
	"rating",
	{
		id,
		rating: real("rating").notNull(),
		finishedBook: boolean("finished_book").notNull().default(true),
		timestamp: timestamp("timestamp").notNull().defaultNow(),
		comment: text("comment"),
		bookId: uuid("book_id")
			.notNull()
			.references(() => BookTable.id, { onDelete: "cascade" }),
		userId: uuid("user_id")
			.notNull()
			.references(() => UserTable.id, { onDelete: "cascade" }),
	},
	(rating) => [
		check("rating_correct_value", sql`${rating.rating} BETWEEN 1 and 5`),
		check(
			"comment_min_length",
			sql`${rating.comment} IS NULL OR char_length(${rating.comment}) > 0`
		),
	]
);

// Relations
export const RatingTableRelations = relations(RatingTable, ({ one }) => {
	return {
		book: one(BookTable, {
			fields: [RatingTable.bookId],
			references: [BookTable.id],
		}),
		user: one(UserTable, {
			fields: [RatingTable.userId],
			references: [UserTable.id],
		}),
	};
});
