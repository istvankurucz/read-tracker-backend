import { boolean, check, pgTable, real, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { id } from "../schemaHelpers";
import { UserTable } from "./UserTable";
import { BookTable } from "./BookTable";
import { relations, sql } from "drizzle-orm";

// Schema
export const ReviewTable = pgTable(
	"review",
	{
		id,
		rating: real("rating").notNull(),
		finishedBook: boolean("finished_book").notNull().default(true),
		timestamp: timestamp("timestamp")
			.notNull()
			.defaultNow()
			.$onUpdate(() => new Date()),
		comment: text("comment"),
		bookId: uuid("book_id")
			.notNull()
			.references(() => BookTable.id, { onDelete: "cascade" }),
		userId: uuid("user_id")
			.notNull()
			.references(() => UserTable.id, { onDelete: "cascade" }),
	},
	(review) => [
		check("review_correct_value", sql`${review.rating} BETWEEN 1 and 5`),
		check(
			"comment_min_length",
			sql`${review.comment} IS NULL OR char_length(${review.comment}) > 0`
		),
		unique("unique_book_id_and_user_id_pair").on(review.bookId, review.userId),
	]
);

// Relations
export const ReviewTableRelations = relations(ReviewTable, ({ one }) => {
	return {
		book: one(BookTable, {
			fields: [ReviewTable.bookId],
			references: [BookTable.id],
		}),
		user: one(UserTable, {
			fields: [ReviewTable.userId],
			references: [UserTable.id],
		}),
	};
});
