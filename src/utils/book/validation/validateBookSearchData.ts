import ValidationError from "../../../classes/ValidationError";
import { BookSearchData, bookSearchSchema } from "./schemas/bookSearchSchema";

export default function validateBookSearchData(searchData: unknown): BookSearchData {
	// Validation
	const { success, data, error } = bookSearchSchema.safeParse(searchData);
	if (!success) throw new ValidationError(error);

	// Return validated data
	return data;
}
