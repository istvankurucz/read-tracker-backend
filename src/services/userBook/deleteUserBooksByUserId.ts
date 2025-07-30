import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { UserBookTable } from "../../drizzle/schema/UserBookTable";

export default async function deleteUserBooksByUserId(userId: string): Promise<void> {
	await db.delete(UserBookTable).where(eq(UserBookTable.userId, userId));
}
