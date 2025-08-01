import { ReviewTable } from "../drizzle/schema/ReviewTable";
import { LocalBook } from "./bookTypes";
import { User } from "./userTypes";

//#region Review DB types
export type ReviewSelect = typeof ReviewTable.$inferSelect;
export type ReviewInsert = typeof ReviewTable.$inferInsert;
export type ReviewUpdate = Partial<Pick<ReviewSelect, "rating" | "finishedBook" | "comment">>;
//#endregion

//#region Review
export type Review = Omit<ReviewSelect, "userId" | "bookId"> & {
	user: User;
	book: LocalBook;
};
//#endregion
