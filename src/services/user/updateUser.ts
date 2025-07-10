import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { UserTable } from "../../drizzle/schema/UserTable";
import { UserSelect, UserUpdate } from "../../types/userTypes";
import AppError from "../../classes/AppError";

export default async function updateUser(id: string, data: UserUpdate): Promise<UserSelect> {
	// Update user
	const [user] = await db.update(UserTable).set(data).where(eq(UserTable.id, id)).returning();

	// Check if user was updated successfully
	if (user == undefined) {
		throw new AppError({ message: "Error updating user." });
	}

	// Return user
	return user;
}
