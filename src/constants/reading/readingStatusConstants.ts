// Reading status options
export const readingStatusOptions = ["in progress", "finished"] as const;
export type ReadingStatus = (typeof readingStatusOptions)[number];
