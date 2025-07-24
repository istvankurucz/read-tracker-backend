import { z } from "zod/v4";

export const updateUserBookListsSchema = z.object({
	systemListId: z.union([z.uuid("Invalid list ID."), z.null()]),
	customListIds: z.array(z.uuid("Invalid list ID.")),
});
export type UpdateUserBookListsData = z.infer<typeof updateUserBookListsSchema>;
