import ValidationError from "../../../classes/ValidationError";
import { UpdateReviewData, updateReviewSchema } from "./schemas/updateReviewSchema";

export default function validateUpdateReviewData(reviewData: unknown): UpdateReviewData {
	// Validation
	const { success, data, error } = updateReviewSchema.safeParse(reviewData);
	if (!success) throw new ValidationError(error);

	// Return validated data
	return data;
}
