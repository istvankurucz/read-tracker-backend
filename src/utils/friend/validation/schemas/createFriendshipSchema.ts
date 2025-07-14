import { z } from "zod/v4";

export const createFriendshipSchema = z.object({
	addresseeId: z.uuid("Invalid addresse ID."),
});
export type CreateFriendshipData = z.infer<typeof createFriendshipSchema>;
