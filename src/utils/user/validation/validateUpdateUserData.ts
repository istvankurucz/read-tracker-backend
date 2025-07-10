import ValidationError from "../../../classes/ValidationError";
import updateUserSchema, { type UpdateUserData } from "./schemas/updateUserSchema";

export default function validateUpdateUserData(userData: unknown): UpdateUserData {
	// Validate user data
	const { success, data, error } = updateUserSchema.safeParse(userData);
	if (!success) throw new ValidationError(error);

	// Return validated data
	return data;
}
