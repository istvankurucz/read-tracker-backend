import { z } from "zod/v4";

export const createReviewSchema = z.object({
	rating: z.number().min(1, "Rating must be min 1.").max(5, "Rating can be max 5."),
	finishedBook: z.boolean(),
	comment: z.union([z.string().trim().nonempty("Comment missing."), z.null()]).optional(),
});
export type CreateReviewData = z.infer<typeof createReviewSchema>;
