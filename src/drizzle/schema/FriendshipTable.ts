import { check, pgEnum, pgTable, primaryKey, unique, uuid } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";
import { UserTable } from "./UserTable";
import { relations, sql } from "drizzle-orm";
import { friendshipStatusOptions } from "../../constants/friendships/friendshipConstants";

// Enums
export const friendshipStatusEnum = pgEnum("friendship_status", friendshipStatusOptions);

// Schema
export const FriendshipTable = pgTable(
	"friendship",
	{
		user1Id: uuid("user1_id")
			.notNull()
			.references(() => UserTable.id, { onDelete: "cascade" }),
		user2Id: uuid("user2_id")
			.notNull()
			.references(() => UserTable.id, { onDelete: "cascade" }),
		status: friendshipStatusEnum("status").notNull().default("pending"),
		updatedAt,
		createdAt,
	},
	(friendship) => [
		primaryKey({ columns: [friendship.user1Id, friendship.user2Id] }),
		check("user_id_order", sql`${friendship.user1Id} < ${friendship.user2Id}`),
		unique("unique_friendship_pair").on(friendship.user1Id, friendship.user2Id),
	]
);

// Relations
export const FriendshipTableRelations = relations(FriendshipTable, ({ one }) => {
	return {
		user1: one(UserTable, {
			fields: [FriendshipTable.user1Id],
			references: [UserTable.id],
		}),
		user2: one(UserTable, {
			fields: [FriendshipTable.user2Id],
			references: [UserTable.id],
		}),
	};
});
