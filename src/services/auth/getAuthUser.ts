import { User } from "@supabase/supabase-js";
import AppError from "../../classes/AppError";
import { supabase } from "../../config/supabase";

export default async function getAuthUser(token: string): Promise<User> {
	// Get user from token
	const { data, error } = await supabase.auth.getUser(token);

	// Check error
	if (error != null) {
		throw new AppError({
			message: "Unauthorized request",
			details: error.message,
			status: 401,
		});
	}

	// Return user
	return data.user;
}
