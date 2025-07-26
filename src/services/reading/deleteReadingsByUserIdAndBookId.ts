import { and, eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { ReadingTable } from "../../drizzle/schema/ReadingTable";

export default async function deleteReadingsByUserIdAndBookId(ids: {
	userId: string;
	bookId: string;
}): Promise<void> {
	// Extract IDs
	const { userId, bookId } = ids;

	// Delete readings
	await db
		.delete(ReadingTable)
		.where(and(eq(ReadingTable.userId, userId), eq(ReadingTable.bookId, bookId)));
}
