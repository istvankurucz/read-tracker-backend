import AppError from "../../classes/AppError";
import { db } from "../../drizzle/db";
import { UserTable } from "../../drizzle/schema/UserTable";
import { UserInsert, UserSelect } from "../../types/userTypes";

export default async function createUser(data: UserInsert): Promise<UserSelect> {
	// Insert new user
	const [user] = await db.insert(UserTable).values(data).returning();

	// Check if user was inserted successfully
	if (user == undefined) {
		throw new AppError({ message: "Error creating user." });
	}

	// Return user
	return user;
}
