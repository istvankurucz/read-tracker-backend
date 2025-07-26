export const SYSTEM_LIST_NAMES = [
	"Want to Read",
	"Currently Reading",
	"Finished",
	"Not Finished",
] as const;
export type SystemListName = (typeof SYSTEM_LIST_NAMES)[number];
