import ValidationError from "../../../classes/ValidationError";
import { CreateListData, createListSchema } from "./schemas/createListSchema";

export default function validateCreateListData(listData: unknown): CreateListData {
	// Validation
	const { success, data, error } = createListSchema.safeParse(listData);
	if (!success) throw new ValidationError(error);

	// Return validated data
	return data;
}
