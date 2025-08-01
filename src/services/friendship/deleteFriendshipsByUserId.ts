import { eq, or } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { FriendshipTable } from "../../drizzle/schema/FriendshipTable";

export default async function deleteFriendshipsByUserId(userId: string): Promise<void> {
	await db
		.delete(FriendshipTable)
		.where(or(eq(FriendshipTable.requesterId, userId), eq(FriendshipTable.addresseeId, userId)));
}
