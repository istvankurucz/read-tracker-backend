import { GoalData } from "../../types/goalTypes";
import getWeekStartAndEndDate from "./getWeekStartAndEndDate";

export default function getGoalStartAndEndDate(goal: GoalData): { start: Date; end: Date } {
	// Default
	const defaultDates = { start: new Date(0), end: new Date(0) };

	switch (goal.type) {
		case "yearly": {
			const start = new Date(goal.year, 0, 1);
			const end = new Date(new Date(goal.year + 1, 0, 1).getTime() - 1);
			return { start, end };
		}
		case "monthly": {
			// Check month
			if (!goal.month) return defaultDates;

			const start = new Date(goal.year, goal.month, 1);
			const end = new Date(new Date(goal.year, goal.month + 1, 1).getTime() - 1);
			return { start, end };
		}
		case "weekly": {
			// Check week
			if (!goal.week) return defaultDates;

			return getWeekStartAndEndDate(goal.week, goal.year);
		}
	}
}
