import { integer, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { id } from "../schemaHelpers";
import { ReadingTable } from "./ReadingTable";
import { check } from "drizzle-orm/gel-core";
import { relations, sql } from "drizzle-orm";

// Schema
export const ReadingSnapshotTable = pgTable(
	"reading_snapshot",
	{
		id,
		timestamp: timestamp("timestamp").notNull().defaultNow(),
		page: integer("page").notNull(),
		time: integer("time"),
		readingId: uuid("reading_id")
			.notNull()
			.references(() => ReadingTable.id, { onDelete: "cascade" }),
	},
	(snapshot) => [
		check("timestamp_not_future", sql`${snapshot.timestamp} <= now()`),
		check("page_positive", sql`${snapshot.page} > 0`),
		check("time_positive", sql`${snapshot.time} > 0`),
	]
);

// Relations
export const ReadingSnapshotTableRelations = relations(ReadingSnapshotTable, ({ one }) => {
	return {
		reading: one(ReadingTable, {
			fields: [ReadingSnapshotTable.readingId],
			references: [ReadingTable.id],
		}),
	};
});
