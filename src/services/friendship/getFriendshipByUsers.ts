import { db } from "../../drizzle/db";
import { FriendshipSelect } from "../../types/friendshipTypes";
import AppError from "../../classes/AppError";

export default async function getFriendshipByUsers(userIds: {
	id1: string;
	id2: string;
}): Promise<FriendshipSelect> {
	// Extract user IDs
	const { id1, id2 } = userIds;

	// Get friendship
	const friendship = await db.query.FriendshipTable.findFirst({
		where: (friendship, { and, or, eq }) =>
			or(
				and(eq(friendship.requesterId, id1), eq(friendship.addresseeId, id2)),
				and(eq(friendship.addresseeId, id1), eq(friendship.requesterId, id2))
			),
	});

	// Check friendship
	if (!friendship) throw new AppError({ message: "Friendship not found.", status: 404 });

	// Return friendship
	return friendship;
}
