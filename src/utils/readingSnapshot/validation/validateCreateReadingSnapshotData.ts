import ValidationError from "../../../classes/ValidationError";
import {
	CreateReadingSnapshotData,
	createReadingSnapshotSchema,
} from "./schemas/createReadingSnapshotSchema";

export default function validateCreateReadingSnapshotData(
	snapshotData: unknown,
	params: { maxPages: number }
): CreateReadingSnapshotData {
	// Validation
	const { success, data, error } = createReadingSnapshotSchema(params).safeParse(snapshotData);
	if (!success) throw new ValidationError(error);

	// Return validated data
	return data;
}
