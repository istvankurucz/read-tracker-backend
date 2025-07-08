import { integer, pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { id } from "../schemaHelpers";
import { readingStatusOptions } from "../../constants/reading/readingStatusConstants";
import { check } from "drizzle-orm/gel-core";
import { relations, sql } from "drizzle-orm";
import { BookTable } from "./BookTable";
import { UserTable } from "./UserTable";
import { ReadingSnapshotTable } from "./ReadingSnapshotTable";

// Enums
export const readingStatusEnum = pgEnum("reading_status", readingStatusOptions);

// Schema
export const ReadingTable = pgTable(
	"reading",
	{
		id,
		status: readingStatusEnum("status").notNull().default("not started"),
		pages: integer("pages"),
		startedAt: timestamp("started_at"),
		finishedAt: timestamp("finished_at"),
		bookId: uuid("book_id")
			.notNull()
			.references(() => BookTable.id, { onDelete: "cascade" }),
		userId: uuid("user_id")
			.notNull()
			.references(() => UserTable.id, { onDelete: "cascade" }),
	},
	(reading) => [
		check("pages_positive", sql`${reading.pages} > 0`),
		check(
			"started_at_date_not_future",
			sql`${reading.startedAt} IS NULL OR ${reading.startedAt} <= now()`
		),
		check(
			"finished_at_date_not_future",
			sql`${reading.finishedAt} IS NULL OR ${reading.finishedAt} <= now()`
		),
	]
);

// Relations
export const ReadingTableRelations = relations(ReadingTable, ({ one, many }) => {
	return {
		book: one(BookTable, {
			fields: [ReadingTable.bookId],
			references: [BookTable.id],
		}),
		user: one(UserTable, {
			fields: [ReadingTable.userId],
			references: [UserTable.id],
		}),
		snapshots: many(ReadingSnapshotTable),
	};
});
