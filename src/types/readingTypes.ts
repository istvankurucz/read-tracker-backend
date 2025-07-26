import { ReadingTable } from "../drizzle/schema/ReadingTable";
import { ReadingSnapshot } from "./readingSnapshotTypes";

//#region Reading DB types
export type ReadingSelect = typeof ReadingTable.$inferSelect;
export type ReadingInsert = typeof ReadingTable.$inferInsert;
export type ReadingUpdate = Partial<
	Pick<ReadingSelect, "status" | "pages" | "startedAt" | "finishedAt">
>;
//#endregion

//#region Reading
export type Reading = Omit<ReadingSelect, "userId" | "bookId"> & {
	snapshots: ReadingSnapshot[];
};
//#endregion
