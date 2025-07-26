import ValidationError from "../../../classes/ValidationError";
import { UpdateReadingData, updateReadingSchema } from "./schemas/updateReadingSchema";

export default function validateUpdateReadingData(readingData: unknown): UpdateReadingData {
	// Validation
	const { success, data, error } = updateReadingSchema.safeParse(readingData);
	if (!success) throw new ValidationError(error);

	// Return validated data
	return data;
}
