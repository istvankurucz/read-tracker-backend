import AppError from "../../classes/AppError";
import { db } from "../../drizzle/db";
import { Goal } from "../../types/goalTypes";

export default async function getGoal(id: string, params: { userId: string }): Promise<Goal> {
	// Extract params
	const { userId } = params;

	// Get goal
	const goal = await db.query.GoalTable.findFirst({
		columns: {
			userId: false,
		},
		where: (goal, { and, eq }) => and(eq(goal.id, id), eq(goal.userId, userId)),
	});

	// Check goal
	if (!goal) throw new AppError({ message: "Goal not found.", status: 404 });

	// Return goal
	return goal;
}
