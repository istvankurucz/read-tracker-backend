import ValidationError from "../../../classes/ValidationError";
import { UpdateListBookData, updateListBooksSchema } from "./schemas/updateListBooksSchema";

export default function validateUpdateListBooksData(listBookData: unknown): UpdateListBookData {
	// Validation
	const { success, data, error } = updateListBooksSchema.safeParse(listBookData);
	if (!success) throw new ValidationError(error);

	// Return validated data
	return data;
}
