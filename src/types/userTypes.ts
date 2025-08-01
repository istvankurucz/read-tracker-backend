import { UserTable } from "../drizzle/schema/UserTable";

// #region User DB types
export type UserSelect = typeof UserTable.$inferSelect;
export type UserInsert = typeof UserTable.$inferInsert;
export type UserUpdate = Partial<Pick<UserSelect, "name" | "deletedAt">>;
//#endregion

//#region User
export type User = Omit<UserSelect, "deletedAt">;
//#endregion
