import { z } from "zod/v4";

export const bookSearchSchema = z.object({
	q: z.string(),
	limit: z.number().min(1, { error: "Limit mut be min 1." }).optional(),
});

export type BookSearchData = z.infer<typeof bookSearchSchema>;
