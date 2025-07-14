import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { FriendshipTable } from "../../drizzle/schema/FriendshipTable";
import { FriendshipSelect } from "../../types/friendshipTypes";
import { UpdateFriendshipData } from "../../utils/friend/validation/schemas/updateFriendshipSchema";
import AppError from "../../classes/AppError";

export default async function updateFriendship(
	id: string,
	data: UpdateFriendshipData
): Promise<FriendshipSelect> {
	// Update friendship
	const [friendship] = await db
		.update(FriendshipTable)
		.set(data)
		.where(eq(FriendshipTable.id, id))
		.returning();

	// Check friendship
	if (!friendship) throw new AppError({ message: "Error updating friendship." });

	// Return friendship
	return friendship;
}
