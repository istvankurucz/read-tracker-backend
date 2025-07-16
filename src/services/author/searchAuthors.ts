import { db } from "../../drizzle/db";
import { AuthorSelect } from "../../types/authorTypes";

export default async function searchAuthors(options: {
	q: string;
	limit?: number;
}): Promise<AuthorSelect[]> {
	// Extract options
	const { q, limit } = options;

	// Search authors
	const authors = await db.query.AuthorTable.findMany({
		where: (author, { ilike }) => ilike(author.name, `%${q}%`),
		limit: limit,
	});

	// Return authors
	return authors;
}
