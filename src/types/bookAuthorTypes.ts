import { BookAuthorTable } from "../drizzle/schema/BookAuthorTable";

// #region Book author DB types
export type BookAuthorSelect = typeof BookAuthorTable.$inferSelect;
export type BookAuthorInsert = typeof BookAuthorTable.$inferInsert;
//#endregion
