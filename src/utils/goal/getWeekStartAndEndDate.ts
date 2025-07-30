import getFirstMondayOfYear from "./getFirstMondayOfYear";

export default function getWeekStartAndEndDate(
	weekIndex: number,
	year = new Date().getFullYear()
): { start: Date; end: Date } {
	// Get first Monday
	const firstMonday = getFirstMondayOfYear(year);

	// Calculate start and end dates for the week
	const startDate = new Date(firstMonday);
	startDate.setDate(firstMonday.getDate() + weekIndex * 7);
	const endDate = new Date(firstMonday);
	endDate.setDate(firstMonday.getDate() + (weekIndex + 1) * 7);
	endDate.setTime(endDate.getTime() - 1);

	// Return dates
	return { start: startDate, end: endDate };
}
