import { z } from "zod/v4";

export const createListSchema = z.object({
	name: z.string().trim().nonempty("Name missing."),
	public: z.boolean(),
});
export type CreateListData = z.infer<typeof createListSchema>;
