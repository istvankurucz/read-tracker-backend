import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { GoalTable } from "../../drizzle/schema/GoalTable";

export default async function deleteGoalsByUserId(userId: string): Promise<void> {
	await db.delete(GoalTable).where(eq(GoalTable.userId, userId));
}
