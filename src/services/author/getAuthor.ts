import AppError from "../../classes/AppError";
import { db } from "../../drizzle/db";
import { Author } from "../../types/authorTypes";

export default async function getAuthor(id: string): Promise<Author> {
	// Get author
	const author = await db.query.AuthorTable.findFirst({
		columns: {
			userId: false,
		},
		where: (author, { eq }) => eq(author.id, id),
	});

	// Check author
	if (!author) throw new AppError({ message: "Author not found.", status: 400 });

	// Return author
	return author;
}
