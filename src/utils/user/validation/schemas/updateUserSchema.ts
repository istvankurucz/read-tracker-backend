import z from "zod/v4";

const updateUserSchema = z
	.object({
		name: z.string().trim().nonempty("Name is missing."),
	})
	.partial();

export default updateUserSchema;
export type UpdateUserData = z.infer<typeof updateUserSchema>;
