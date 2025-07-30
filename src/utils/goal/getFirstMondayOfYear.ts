export default function getFirstMondayOfYear(year = new Date().getFullYear()): Date {
	// Week starts from Monday
	const firstDayOfYear = new Date(year, 0, 1);

	// Find the first Monday of the year
	const firstMondayOffset = (8 - firstDayOfYear.getDay()) % 7;
	const firstMonday = new Date(year, 0, 1 + firstMondayOffset);

	// Return first Monday
	return firstMonday;
}
