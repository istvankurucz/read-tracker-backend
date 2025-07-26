import ValidationError from "../../../classes/ValidationError";
import { CreateReadingData, createReadingSchema } from "./schemas/createReadingSchema";

export default function validateCreateReadingData(readingData: unknown): CreateReadingData {
	// Validation
	const { success, data, error } = createReadingSchema.safeParse(readingData);
	if (!success) throw new ValidationError(error);

	// Return validated data
	return data;
}
