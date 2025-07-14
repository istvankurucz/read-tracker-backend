import { z } from "zod/v4";

export const friendSearchSchema = z.object({
	q: z.string(),
	limit: z.number().min(1, { error: "Limit mut be min 1." }).optional(),
});

export type FriendSearchData = z.infer<typeof friendSearchSchema>;
