import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { UserTable } from "./UserTable";
import { check } from "drizzle-orm/gel-core";
import { relations, sql } from "drizzle-orm";
import { ListBookTable } from "./ListBookTable";

// Schema
export const ListTable = pgTable(
	"list",
	{
		id,
		name: text("name").notNull(),
		public: boolean("public").notNull().default(true),
		system: boolean("system").notNull().default(false),
		userId: uuid("user_id")
			.notNull()
			.references(() => UserTable.id, { onDelete: "cascade" }),
		updatedAt,
		createdAt,
	},
	(list) => [check("name_min_length", sql`char_length(${list.name}) > 0`)]
);

// Relations
export const ListTableRelations = relations(ListTable, ({ one, many }) => {
	return {
		user: one(UserTable, {
			fields: [ListTable.userId],
			references: [UserTable.id],
		}),
		books: many(ListBookTable),
	};
});
