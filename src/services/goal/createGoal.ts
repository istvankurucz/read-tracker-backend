import AppError from "../../classes/AppError";
import { db } from "../../drizzle/db";
import { GoalTable } from "../../drizzle/schema/GoalTable";
import { GoalInsert, GoalSelect } from "../../types/goalTypes";

export default async function createGoal(data: GoalInsert): Promise<GoalSelect> {
	// Create goal
	const [goal] = await db.insert(GoalTable).values(data).returning();

	// Check goal
	if (!goal) throw new AppError({ message: "Error creating goal." });

	// Return goal
	return goal;
}
