import { db } from "../../drizzle/db";
import { Goal } from "../../types/goalTypes";

export default async function getGoalsByUserId(userId: string): Promise<Goal[]> {
	// Get goals
	const goals = await db.query.GoalTable.findMany({
		columns: {
			userId: false,
		},
		where: (goal, { eq }) => eq(goal.userId, userId),
	});

	// Return goals
	return goals;
}
