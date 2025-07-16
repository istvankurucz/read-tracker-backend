import { db } from "../../drizzle/db";
import { AuthorSelect } from "../../types/authorTypes";

export default async function getAuthors(ids: string[]): Promise<AuthorSelect[]> {
	// Get authors
	const authors = await db.query.AuthorTable.findMany({
		where: (author, { inArray }) => inArray(author.id, ids),
	});

	// Return authors
	return authors;
}
