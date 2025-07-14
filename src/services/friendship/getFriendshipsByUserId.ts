import { desc, eq, or } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { FriendshipTable } from "../../drizzle/schema/FriendshipTable";
import { UserTable } from "../../drizzle/schema/UserTable";
import { Friendship } from "../../types/friendshipTypes";
import { alias } from "drizzle-orm/pg-core";

export default async function getFriendshipsByUserId(userId: string): Promise<Friendship[]> {
	// Aliases
	const RequesterTable = alias(UserTable, "requester");
	const addresseeTable = alias(UserTable, "addressee");

	// Get friendships
	const friendships = await db
		.select({
			id: FriendshipTable.id,
			status: FriendshipTable.status,
			updatedAt: FriendshipTable.updatedAt,
			createdAt: FriendshipTable.createdAt,
			requester: {
				id: RequesterTable.id,
				name: RequesterTable.name,
			},
			addressee: {
				id: addresseeTable.id,
				name: addresseeTable.name,
			},
		})
		.from(FriendshipTable)
		.innerJoin(RequesterTable, eq(FriendshipTable.requesterId, RequesterTable.id))
		.innerJoin(addresseeTable, eq(FriendshipTable.addresseeId, addresseeTable.id))
		.where(or(eq(FriendshipTable.requesterId, userId), eq(FriendshipTable.addresseeId, userId)))
		.orderBy(desc(FriendshipTable.updatedAt));

	// Return friendships
	return friendships;
}
