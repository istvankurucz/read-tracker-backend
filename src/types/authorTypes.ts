import { AuthorTable } from "../drizzle/schema/AuthorTable";

//#endregion Author DB types
export type AuthorSelect = typeof AuthorTable.$inferSelect;
export type AuthorInsert = typeof AuthorTable.$inferInsert;
//#endregion

//#region Author
export type Author = Omit<AuthorSelect, "userId">;
//#endregion
