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
		requesterId: uuid("requester_id")
			.notNull()
			.references(() => UserTable.id, { onDelete: "cascade" }),
		addresseeId: uuid("addressee_id")
			.notNull()
			.references(() => UserTable.id, { onDelete: "cascade" }),
		status: friendshipStatusEnum("status").notNull().default("pending"),
		updatedAt,
		createdAt,
	},
	(friendship) => [
		primaryKey({ columns: [friendship.requesterId, friendship.addresseeId] }),
		unique("unique_friendship_pair").on(friendship.requesterId, friendship.addresseeId),
	]
);

// Relations
export const FriendshipTableRelations = relations(FriendshipTable, ({ one }) => {
	return {
		requester: one(UserTable, {
			fields: [FriendshipTable.requesterId],
			references: [UserTable.id],
		}),
		addressee: one(UserTable, {
			fields: [FriendshipTable.addresseeId],
			references: [UserTable.id],
		}),
	};
});
