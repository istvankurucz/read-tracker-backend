import { db } from "../../drizzle/db";
import { Goal, GoalDataWithStatus } from "../../types/goalTypes";
import getGoalsMinStartAndMaxEndDate from "../../utils/goal/getGoalsMinStartAndMaxEndDate";
import getGoalStartAndEndDate from "../../utils/goal/getGoalStartAndEndDate";
import getGoalStatus from "../../utils/goal/getGoalStatus";
import mapReadingsToGoal from "../../utils/goal/mapReadingsToGoal";
import getReadingsByUserIdAndDate from "../reading/getReadingsByUserIdAndDate";

export default async function getGoalsByUserId(userId: string): Promise<Goal[]> {
	// Get goals
	const goalsData = await db.query.GoalTable.findMany({
		columns: {
			userId: false,
		},
		where: (goal, { eq }) => eq(goal.userId, userId),
		orderBy: (goal, { desc }) => [desc(goal.year), desc(goal.month), desc(goal.week)],
	});

	// Get goal status
	const goalsWithStatus: GoalDataWithStatus[] = goalsData.map((goal) => ({
		...goal,
		status: getGoalStatus(goal),
	}));

	// Get goals start and end date
	const goalDates = goalsData.map((goal) => getGoalStartAndEndDate(goal));
	const range = getGoalsMinStartAndMaxEndDate(goalDates);

	// Get readings from range
	const readings = await getReadingsByUserIdAndDate({ userId, dates: range });

	// Map readings to goals
	const goals = goalsWithStatus.map((goal) => mapReadingsToGoal(goal, { readings }));

	// Return goals
	return goals;
}
