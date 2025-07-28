import { GoalTable } from "../drizzle/schema/GoalTable";

//#region Goal DB types
export type GoalSelect = typeof GoalTable.$inferSelect;
export type GoalInsert = typeof GoalTable.$inferInsert;
export type GoalUpdate = Partial<Pick<GoalSelect, "target" | "type" | "year" | "month" | "week">>;
//#endregion

//#region Goal
export type Goal = Omit<GoalSelect, "userId">;
//#endregion
