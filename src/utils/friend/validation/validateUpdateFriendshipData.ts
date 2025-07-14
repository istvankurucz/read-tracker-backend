import ValidationError from "../../../classes/ValidationError";
import { UpdateFriendshipData, updateFriendshipSchema } from "./schemas/updateFriendshipSchema";

export default function validateUpdateFriendshipData(
	friendshipData: unknown
): UpdateFriendshipData {
	// Validate user data
	const { success, data, error } = updateFriendshipSchema.safeParse(friendshipData);
	if (!success) throw new ValidationError(error);

	// Return validated data
	return data;
}
