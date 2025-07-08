import ValidationError from "../../../classes/ValidationError";
import createUserSchema, { CreateUserData } from "./schemas/createUserSchema";

export default function validateCreateUserData(userData: unknown): CreateUserData {
	// Validate user data
	const { success, data, error } = createUserSchema.safeParse(userData);
	if (!success) throw new ValidationError(error);

	// Return validated data
	return data;
}
