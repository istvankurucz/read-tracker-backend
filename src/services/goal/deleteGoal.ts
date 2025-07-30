import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { GoalTable } from "../../drizzle/schema/GoalTable";

export default async function deleteGoal(id: string): Promise<void> {
	await db.delete(GoalTable).where(eq(GoalTable.id, id));
}
