import ValidationError from "../../../classes/ValidationError";
import {
	UpdateReadingSnapshotData,
	updateReadingSnapshotSchema,
} from "./schemas/updateReadingSnapshotSchema";

export default function validateUpdateReadingSnapshotData(
	snapshotData: unknown,
	params: { maxPages: number }
): UpdateReadingSnapshotData {
	// Validation
	const { success, data, error } = updateReadingSnapshotSchema(params).safeParse(snapshotData);
	if (!success) throw new ValidationError(error);

	// Return validated data
	return data;
}
