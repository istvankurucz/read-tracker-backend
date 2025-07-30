import { Goal } from "../../types/goalTypes";
import getGoalStartAndEndDate from "../../utils/goal/getGoalStartAndEndDate";
import getGoalStatus from "../../utils/goal/getGoalStatus";
import getReadingsByUserIdAndDate from "../reading/getReadingsByUserIdAndDate";
import getGoalData from "./getGoalData";

export default async function getGoal(id: string, params: { userId: string }): Promise<Goal> {
	// Extract params
	const { userId } = params;

	// Get goal data
	const goalData = await getGoalData(id, { userId });

	// Get goal status
	const status = getGoalStatus(goalData);

	// Get goal start and end date
	const dates = getGoalStartAndEndDate(goalData);

	// Get readings
	const readings = await getReadingsByUserIdAndDate({ userId, dates });

	// Return goal
	return { ...goalData, status, readings };
}
