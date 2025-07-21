import { ListTable } from "../drizzle/schema/ListTable";
import { LocalBook } from "./bookTypes";

//#region List DB types
export type ListSelect = typeof ListTable.$inferSelect;
export type ListInsert = typeof ListTable.$inferInsert;
export type ListUpdate = Partial<Pick<ListSelect, "name" | "public">>;
//#endregion

//#region List
export type List = Omit<ListSelect, "userId"> & {
	books: LocalBook[];
};
export type ListWithUserId = ListSelect & {
	books: LocalBook[];
};
//#endregion
