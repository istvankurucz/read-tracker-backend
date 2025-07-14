import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { FriendshipTable } from "../../drizzle/schema/FriendshipTable";

export default async function deleteFriendship(id: string): Promise<void> {
	await db.delete(FriendshipTable).where(eq(FriendshipTable.id, id));
}
