import { ReadingSnapshotTable } from "../drizzle/schema/ReadingSnapshotTable";

//#region Reading snapshot DB types
export type ReadingSnapshotSelect = typeof ReadingSnapshotTable.$inferSelect;
export type ReadingSnapshotInsert = typeof ReadingSnapshotTable.$inferInsert;
export type ReadingSnapshotUpdate = Partial<
	Pick<ReadingSnapshotSelect, "page" | "time" | "timestamp" | "finishedBook">
>;
//#endregion

//#region Reading snapshot
export type ReadingSnapshot = Omit<ReadingSnapshotSelect, "readingId">;
//#endregion
