import ValidationError from "../../../classes/ValidationError";
import { UpdateBookData, updateBookSchema } from "./schemas/updateBookSchema";

export default function validateUpdateBookData(bookdata: unknown): UpdateBookData {
	// Validation
	const { success, data, error } = updateBookSchema.safeParse(bookdata);
	if (!success) throw new ValidationError(error);

	// Return validated data
	return data;
}
