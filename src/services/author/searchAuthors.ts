import { db } from "../../drizzle/db";
import { Author } from "../../types/authorTypes";

export default async function searchAuthors(options: {
	q: string;
	limit?: number;
}): Promise<Author[]> {
	// Extract options
	const { q, limit } = options;

	// Search authors
	const authors = await db.query.AuthorTable.findMany({
		columns: {
			userId: false,
		},
		where: (author, { ilike }) => ilike(author.name, `%${q}%`),
		limit: limit,
	});

	// Return authors
	return authors;
}
