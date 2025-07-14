import AppError from "../../classes/AppError";
import { db } from "../../drizzle/db";
import { FriendshipTable } from "../../drizzle/schema/FriendshipTable";
import { FriendshipInsert, FriendshipSelect } from "../../types/friendshipTypes";

export default async function createFriendship(data: FriendshipInsert): Promise<FriendshipSelect> {
	// Create friendship
	const [friendship] = await db.insert(FriendshipTable).values(data).returning();

	// Check friendship
	if (!friendship) {
		throw new AppError({ message: "Error creating friendship." });
	}

	// Return friendship
	return friendship;
}
