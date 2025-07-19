import { db } from "../../drizzle/db";

export default async function checkUsedUserBook(data: {
	userId: string;
	bookId: string;
}): Promise<boolean> {
	// Extract data
	const { userId, bookId } = data;

	// Get join
	const join = await db.query.UserBookTable.findFirst({
		where: (userBook, { eq, not, and }) =>
			and(not(eq(userBook.userId, userId)), eq(userBook.bookId, bookId)),
	});

	// Return result
	return join != undefined;
}
