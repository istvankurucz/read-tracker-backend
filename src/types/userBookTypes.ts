import { UserBookTable } from "../drizzle/schema/UserBookTable";

//#region User-book DB types
export type UserBookSelect = typeof UserBookTable.$inferSelect;
export type UserBookInsert = typeof UserBookTable.$inferInsert;
//#endregion
