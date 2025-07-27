import AppError from "../../classes/AppError";
import { db } from "../../drizzle/db";
import { Reading } from "../../types/readingTypes";
import getLocalBook from "../book/getLocalBook";

export default async function getInProgressReadingByBookId(bookId: string): Promise<Reading> {
	// Get reading
	const readingRaw = await db.query.ReadingTable.findFirst({
		columns: {
			bookId: false,
			userId: false,
		},
		with: {
			snapshots: {
				columns: {
					readingId: false,
				},
				orderBy: (snapshot, { desc }) => desc(snapshot.timestamp),
			},
		},
		where: (reading, { and, eq }) =>
			and(eq(reading.status, "in progress"), eq(reading.bookId, bookId)),
	});

	// Check reading
	if (!readingRaw) throw new AppError({ message: "Reading not found.", status: 404 });

	// Get book
	const book = await getLocalBook(bookId);

	// Return reading
	return { ...readingRaw, book };
}
