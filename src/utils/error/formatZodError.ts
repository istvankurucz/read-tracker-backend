import { type ZodError } from "zod/v4";
import { type ValidationError } from "../../types/errorTypes";

export default function formatZodError(error: ZodError): ValidationError[] {
	return error.issues.map((issue) => ({ field: issue.path.join("."), message: issue.message }));
}
