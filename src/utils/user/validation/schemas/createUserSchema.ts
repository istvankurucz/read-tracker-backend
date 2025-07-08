import z from "zod/v4";

const createUserSchema = z.object({
	id: z.uuid("Invalid user ID."),
	name: z.string().trim().nonempty("Name is missing."),
});

export default createUserSchema;
export type CreateUserData = z.infer<typeof createUserSchema>;
