import z from "zod/v4";
import AppError from "../../classes/AppError";

const tokenSchema = z.jwt();

export default function validateAuthToken(token: string | undefined): string {
	// Validate auth token
	const result = tokenSchema.safeParse(token);
	if (!result.success) {
		throw new AppError({
			message: "Unauthorized request",
			details: "Authorization token is not a valid JWT.",
			status: 401,
		});
	}

	// Return validated token
	return result.data;
}
