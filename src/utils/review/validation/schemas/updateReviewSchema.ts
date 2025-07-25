import { z } from "zod/v4";

export const updateReviewSchema = z
	.object({
		rating: z.number().min(1, "Rating must be min 1.").max(5, "Rating can be max 5."),
		finishedBook: z.boolean(),
		comment: z.union([z.string().trim().nonempty("Comment missing."), z.null()]),
	})
	.partial();
export type UpdateReviewData = z.infer<typeof updateReviewSchema>;
