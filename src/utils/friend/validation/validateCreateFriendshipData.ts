import ValidationError from "../../../classes/ValidationError";
import { createFriendshipSchema } from "./schemas/createFriendshipSchema";

export default function validateCreateFriendshipData(friendshipData: unknown) {
	// Validate user data
	const { success, data, error } = createFriendshipSchema.safeParse(friendshipData);
	if (!success) throw new ValidationError(error);

	// Return validated data
	return data;
}
