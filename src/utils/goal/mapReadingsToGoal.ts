import { Goal, GoalData, GoalDataWithStatus } from "../../types/goalTypes";
import { Reading } from "../../types/readingTypes";
import getGoalStartAndEndDate from "./getGoalStartAndEndDate";

export default function mapReadingsToGoal(
	goalData: GoalDataWithStatus,
	options: { readings: Reading[] }
): Goal {
	// Extract options
	const { readings } = options;

	// Get goal start and end date
	const { start, end } = getGoalStartAndEndDate(goalData);

	// Filter goal readings
	const goalReadings = readings.filter(
		(reading) =>
			reading.startedAt &&
			reading.finishedAt &&
			reading.startedAt >= start &&
			reading.finishedAt <= end
	);

	// Return goal
	return {
		...goalData,
		readings: goalReadings,
	};
}
