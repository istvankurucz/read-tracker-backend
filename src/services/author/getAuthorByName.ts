import AppError from "../../classes/AppError";
import { db } from "../../drizzle/db";
import { AuthorSelect } from "../../types/authorTypes";

export default async function getAuthorByName(name: string): Promise<AuthorSelect> {
	// Get author
	const author = await db.query.AuthorTable.findFirst({
		where: (author, { ilike }) => ilike(author.name, name),
	});

	// Check author
	if (!author) throw new AppError({ message: "Author not found.", status: 404 });

	// Return author
	return author;
}
