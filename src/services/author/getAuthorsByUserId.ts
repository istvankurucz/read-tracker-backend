import { db } from "../../drizzle/db";
import { Author } from "../../types/authorTypes";

export default async function getAuthorsByUserId(userId: string): Promise<Author[]> {
	// Get authors
	const authors = await db.query.AuthorTable.findMany({
		columns: {
			userId: false,
		},
		where: (author, { eq }) => eq(author.userId, userId),
	});

	// Return authors
	return authors;
}
