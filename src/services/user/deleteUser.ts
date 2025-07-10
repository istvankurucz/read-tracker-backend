import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { UserTable } from "../../drizzle/schema/UserTable";

export default async function deleteUser(id: string): Promise<void> {
	await db.delete(UserTable).where(eq(UserTable.id, id));
}
