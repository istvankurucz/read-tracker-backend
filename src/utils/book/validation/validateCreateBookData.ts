import ValidationError from "../../../classes/ValidationError";
import { CreateBookData, createBookSchema } from "./schemas/createBookSchema";

export default function validateCreateBookData(bookdata: unknown): CreateBookData {
	// Validation
	const { success, data, error } = createBookSchema.safeParse(bookdata);
	if (!success) throw new ValidationError(error);

	// Return validated data
	return data;
}
