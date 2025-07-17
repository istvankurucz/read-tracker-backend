import AppError from "../../classes/AppError";
import { db } from "../../drizzle/db";
import { AuthorSelect } from "../../types/authorTypes";

export default async function getAuthor(id: string): Promise<AuthorSelect> {
	// Get author
	const author = await db.query.AuthorTable.findFirst({
		where: (author, { eq }) => eq(author.id, id),
	});

	// Check author
	if (!author) throw new AppError({ message: "Author not found.", status: 400 });

	// Return author
	return author;
}
