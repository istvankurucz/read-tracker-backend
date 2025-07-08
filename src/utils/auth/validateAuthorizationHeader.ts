import { z } from "zod/v4";
import AppError from "../../classes/AppError";

const authorizationHeaderSchema = z.string().startsWith("Bearer ");

export default function validateAuthorizationHeader(authorization: string | undefined): string {
	// Validate authorization
	const result = authorizationHeaderSchema.safeParse(authorization);
	if (!result.success) {
		throw new AppError({
			message: "Unauthorized request",
			details: "Authorization header missing.",
			status: 401,
		});
	}

	// Return validated data
	return result.data;
}
