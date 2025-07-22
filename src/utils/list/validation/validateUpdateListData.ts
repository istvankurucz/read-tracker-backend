import ValidationError from "../../../classes/ValidationError";
import { UpdateListData, updateListSchema } from "./schemas/updateListSchema";

export default function validateUpdateListData(listData: unknown): UpdateListData {
	// Validation
	const { success, data, error } = updateListSchema.safeParse(listData);
	if (!success) throw new ValidationError(error);

	// Return validated data
	return data;
}
