import { z } from "zod/v4";
import { friendshipStatusOptions } from "../../../../constants/friendships/friendshipConstants";

const friendshipStatusSchema = z.union(
	friendshipStatusOptions.map((option) => z.literal(option)),
	"Invalid friendship status."
);

export const updateFriendshipSchema = z
	.object({
		status: friendshipStatusSchema,
	})
	.partial();
export type UpdateFriendshipData = z.infer<typeof updateFriendshipSchema>;
