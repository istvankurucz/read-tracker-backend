import { ListBookTable } from "../drizzle/schema/ListBookTable";

//#region ListBook DB types
export type ListBookSelect = typeof ListBookTable.$inferSelect;
export type ListBookInsert = typeof ListBookTable.$inferInsert;
//#endregion
