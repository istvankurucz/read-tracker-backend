import { GoalData, GoalStatus } from "../../types/goalTypes";
import getGoalStartAndEndDate from "./getGoalStartAndEndDate";

export default function getGoalStatus(goal: GoalData): GoalStatus {
	// Get current date
	const now = new Date();

	// Get goal start and end date
	const { start, end } = getGoalStartAndEndDate(goal);

	// Determine goal status
	if (now >= start && now <= end) return "active";
	else if (now < start) return "upcoming";
	else return "past";
}
