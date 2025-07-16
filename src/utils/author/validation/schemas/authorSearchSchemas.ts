import { z } from "zod/v4";

export const authorSearchSchemas = z.object({
	q: z.string().nonempty("Query string missing."),
	limit: z.number().min(1, { error: "Limit mut be min 1." }).optional(),
});

export type AuthorSearchData = z.infer<typeof authorSearchSchemas>;
