import { GoalTable } from "../drizzle/schema/GoalTable";
import { Reading } from "./readingTypes";

//#region Goal DB types
export type GoalSelect = typeof GoalTable.$inferSelect;
export type GoalInsert = typeof GoalTable.$inferInsert;
export type GoalUpdate = Partial<Pick<GoalSelect, "target" | "type" | "year" | "month" | "week">>;
//#endregion

//#region Goal data
export type GoalData = Omit<GoalSelect, "userId">;
//#endregion

//#region Goal with status
export type GoalStatus = "active" | "upcoming" | "past";
export type GoalDataWithStatus = GoalData & { status: GoalStatus };
//#endregion

//#region Goal
export type Goal = GoalDataWithStatus & {
	readings: Reading[];
};
//#endregion
