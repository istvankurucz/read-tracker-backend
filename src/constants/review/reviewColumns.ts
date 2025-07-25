import { ReviewTable } from "../../drizzle/schema/ReviewTable";
import { UserTable } from "../../drizzle/schema/UserTable";

export const REVIEW_COLUMNS = {
	id: ReviewTable.id,
	rating: ReviewTable.rating,
	finishedBook: ReviewTable.finishedBook,
	comment: ReviewTable.comment,
	timestamp: ReviewTable.timestamp,
	bookId: ReviewTable.bookId,
	user: {
		id: UserTable.id,
		name: UserTable.name,
	},
} as const;
