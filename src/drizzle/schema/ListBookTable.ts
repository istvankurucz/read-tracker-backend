import { check, pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";
import { ListTable } from "./ListTable";
import { BookTable } from "./BookTable";
import { relations, sql } from "drizzle-orm";

// Schema
export const ListBookTable = pgTable(
	"list_book",
	{
		listId: uuid("list_id")
			.notNull()
			.references(() => ListTable.id, { onDelete: "cascade" }),
		bookId: uuid("book_id")
			.notNull()
			.references(() => BookTable.id, { onDelete: "cascade" }),
		addedAt: timestamp("added_at").notNull().defaultNow(),
	},
	(listBook) => [
		primaryKey({ columns: [listBook.listId, listBook.bookId] }),
		check("added_at_date_not_future", sql`${listBook.addedAt} <= now()`),
	]
);

// Relations
export const ListBookTableRelations = relations(ListBookTable, ({ one }) => {
	return {
		list: one(ListTable, {
			fields: [ListBookTable.listId],
			references: [ListTable.id],
		}),
		book: one(BookTable, {
			fields: [ListBookTable.bookId],
			references: [BookTable.id],
		}),
	};
});
