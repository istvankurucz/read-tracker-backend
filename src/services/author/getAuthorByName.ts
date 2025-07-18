import AppError from "../../classes/AppError";
import { db } from "../../drizzle/db";
import { Author } from "../../types/authorTypes";

export default async function getAuthorByName(name: string): Promise<Author> {
	// Get author
	const author = await db.query.AuthorTable.findFirst({
		columns: {
			userId: false,
		},
		where: (author, { ilike }) => ilike(author.name, name),
	});

	// Check author
	if (!author) throw new AppError({ message: "Author not found.", status: 404 });

	// Return author
	return author;
}
