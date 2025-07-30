import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { GoalTable } from "../../drizzle/schema/GoalTable";
import { GoalSelect, GoalUpdate } from "../../types/goalTypes";
import AppError from "../../classes/AppError";

export default async function updateGoal(id: string, data: GoalUpdate): Promise<GoalSelect> {
	// Update goal
	const [goal] = await db.update(GoalTable).set(data).where(eq(GoalTable.id, id)).returning();

	// Check goal
	if (!goal) throw new AppError({ message: "Error updating goal." });

	// Return goal
	return goal;
}
