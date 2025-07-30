import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { ListTable } from "../../drizzle/schema/ListTable";

export default async function deleteListsByUserId(userId: string): Promise<void> {
	await db.delete(ListTable).where(eq(ListTable.userId, userId));
}
