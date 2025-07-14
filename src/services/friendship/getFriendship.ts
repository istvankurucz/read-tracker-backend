import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { FriendshipTable } from "../../drizzle/schema/FriendshipTable";
import { Friendship } from "../../types/friendshipTypes";
import { alias } from "drizzle-orm/pg-core";
import { UserTable } from "../../drizzle/schema/UserTable";
import AppError from "../../classes/AppError";

export default async function getFriendship(id: string): Promise<Friendship> {
	// Aliases
	const RequesterTable = alias(UserTable, "requester");
	const addresseeTable = alias(UserTable, "addressee");

	// Get friendship
	const [friendship] = await db
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
		.where(eq(FriendshipTable.id, id));

	// Check friendship
	if (!friendship) {
		throw new AppError({ message: "Friendship not found.", status: 404 });
	}

	// Return friendship
	return friendship;
}
