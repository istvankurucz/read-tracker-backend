import ValidationError from "../../../classes/ValidationError";
import { friendSearchSchema } from "./schemas/friendSearchSchema";

export default function validateFriendSearchData(searchData: unknown) {
	// Validation
	const { success, data, error } = friendSearchSchema.safeParse(searchData);
	if (!success) throw new ValidationError(error);

	// Return validated data
	return data;
}
