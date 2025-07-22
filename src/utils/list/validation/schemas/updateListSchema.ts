import { z } from "zod/v4";

export const updateListSchema = z
	.object({
		name: z.string().trim().nonempty("Name missing."),
		public: z.boolean(),
	})
	.partial();
export type UpdateListData = z.infer<typeof updateListSchema>;
