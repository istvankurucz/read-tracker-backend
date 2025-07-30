import ValidationError from "../../../classes/ValidationError";
import { UpdateGoalData, updateGoalSchema } from "./schemas/updateGoalSchema";

export default function validateUpdateGoalData(goalData: unknown): UpdateGoalData {
	// Validation
	const { success, data, error } = updateGoalSchema.safeParse(goalData);
	if (!success) throw new ValidationError(error);

	// Return validated data
	return data;
}
