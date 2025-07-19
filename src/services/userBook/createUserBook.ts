import AppError from "../../classes/AppError";
import { db } from "../../drizzle/db";
import { UserBookTable } from "../../drizzle/schema/UserBookTable";
import { UserBookInsert, UserBookSelect } from "../../types/userBookTypes";

export default async function createUserBook(data: UserBookInsert): Promise<UserBookSelect> {
	// Create user book join
	const [join] = await db.insert(UserBookTable).values(data).returning();

	// Check join
	if (!join) throw new AppError({ message: "Error creating user book." });

	// Return join
	return join;
}
