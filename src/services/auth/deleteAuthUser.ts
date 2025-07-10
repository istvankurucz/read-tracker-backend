import AppError from "../../classes/AppError";
import { supabaseAdmin } from "../../config/supabase";

export default async function deleteAuthUser(id: string): Promise<void> {
	// Delete user
	const { error } = await supabaseAdmin.auth.admin.deleteUser(id);

	// Check error
	if (error) {
		throw new AppError({ message: "Error deleting user from authentication system." });
	}
}
