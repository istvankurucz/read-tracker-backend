import { and, eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { UserBookTable } from "../../drizzle/schema/UserBookTable";

export default async function deleteUserBook(ids: {
	userId: string;
	bookId: string;
}): Promise<void> {
	// Extract IDs
	const { userId, bookId } = ids;

	// Delete join
	await db
		.delete(UserBookTable)
		.where(and(eq(UserBookTable.userId, userId), eq(UserBookTable.bookId, bookId)));
}
