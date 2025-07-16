import ValidationError from "../../../classes/ValidationError";
import { CreateAuthorData, createAuthorSchema } from "./schemas/createAuthorSchema";

export default function validateCreateAuthorData(authorData: unknown): CreateAuthorData {
	// Validation
	const { success, data, error } = createAuthorSchema.safeParse(authorData);
	if (!success) throw new ValidationError(error);

	// Return validated data
	return data;
}
