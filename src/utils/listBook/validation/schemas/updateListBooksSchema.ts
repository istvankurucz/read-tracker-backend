import { z } from "zod/v4";

export const updateListBooksSchema = z.object({
	bookIds: z.array(z.uuid("Invalid book ID.")),
});
export type UpdateListBookData = z.infer<typeof updateListBooksSchema>;
