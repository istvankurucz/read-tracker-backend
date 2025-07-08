// Reading status options
export const readingStatusOptions = [
	"not started",
	"in progress",
	"finished",
	"not finished",
] as const;
export type ReadingStatus = (typeof readingStatusOptions)[number];
