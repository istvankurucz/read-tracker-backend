import { check, pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";
import { UserTable } from "./UserTable";
import { BookTable } from "./BookTable";
import { relations, sql } from "drizzle-orm";

// Schema
export const UserBookTable = pgTable(
	"user_book",
	{
		userId: uuid("user_id")
			.notNull()
			.references(() => UserTable.id, { onDelete: "cascade" }),
		bookId: uuid("book_id")
			.notNull()
			.references(() => BookTable.id, { onDelete: "cascade" }),
		addedAt: timestamp("added_at").notNull().defaultNow(),
	},
	(userBook) => [
		primaryKey({ columns: [userBook.bookId, userBook.userId] }),
		check("added_at_date_not_future", sql`${userBook.addedAt} <= now()`),
	]
);

// Relations
export const UserBookTableRelations = relations(UserBookTable, ({ one }) => {
	return {
		user: one(UserTable, {
			fields: [UserBookTable.userId],
			references: [UserTable.id],
		}),
		book: one(BookTable, {
			fields: [UserBookTable.bookId],
			references: [BookTable.id],
		}),
	};
});
