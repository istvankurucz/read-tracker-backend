import { z } from "zod/v4";

export const createAuthorSchema = z.object({
	name: z.string().trim().nonempty("Name missing."),
});
export type CreateAuthorData = z.infer<typeof createAuthorSchema>;
