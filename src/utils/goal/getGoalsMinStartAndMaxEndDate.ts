import { DateRange } from "../../types/helperTypes";

export default function getGoalsMinStartAndMaxEndDate(datesArray: DateRange[]): DateRange {
	// Default date range
	const defaultRange: DateRange = { start: new Date(0), end: new Date(0) };

	// Initial min and max dates
	const range: DateRange = datesArray[0] ?? defaultRange;

	// Find min start and max end date
	for (const dates of datesArray) {
		if (dates.start < range.start) range.start = dates.start;
		if (dates.end > range.end) range.end = dates.end;
	}

	// Return range
	return range;
}
