import ValidationError from "../../../classes/ValidationError";
import { AuthorSearchData, authorSearchSchemas } from "./schemas/authorSearchSchemas";

export default function validateAuthorSearchData(searchData: unknown): AuthorSearchData {
	// Validation
	const { success, data, error } = authorSearchSchemas.safeParse(searchData);
	if (!success) throw new ValidationError(error);

	// Return validated data
	return data;
}
