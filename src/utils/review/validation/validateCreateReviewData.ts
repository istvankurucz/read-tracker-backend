import ValidationError from "../../../classes/ValidationError";
import { CreateReviewData, createReviewSchema } from "./schemas/createReviewSchema";

export default function validateCreateReviewData(reviewData: unknown): CreateReviewData {
	// Validation
	const { success, data, error } = createReviewSchema.safeParse(reviewData);
	if (!success) throw new ValidationError(error);

	// Return validated data
	return data;
}
