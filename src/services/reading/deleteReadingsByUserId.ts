import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { ReadingTable } from "../../drizzle/schema/ReadingTable";

export default async function deleteReadingsByUserId(userId: string): Promise<void> {
	await db.delete(ReadingTable).where(eq(ReadingTable.userId, userId));
}
