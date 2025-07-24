import ValidationError from "../../../classes/ValidationError";
import {
	UpdateUserBookListsData,
	updateUserBookListsSchema,
} from "./schemas/updateUserBookListsSchema";

export default function validateUpdateUserBookListsData(
	listsData: unknown
): UpdateUserBookListsData {
	// Validation
	const { success, data, error } = updateUserBookListsSchema.safeParse(listsData);
	if (!success) throw new ValidationError(error);

	// Return validated data
	return data;
}
