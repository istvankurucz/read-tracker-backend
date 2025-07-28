import ValidationError from "../../../classes/ValidationError";
import { CreateGoalData, createGoalSchema } from "./schemas/createGoalSchema";

export default function validateCreateGoalData(goalData: unknown): CreateGoalData {
	// Validation
	const { success, data, error } = createGoalSchema.safeParse(goalData);
	if (!success) throw new ValidationError(error);

	// Return validated data
	return data;
}
