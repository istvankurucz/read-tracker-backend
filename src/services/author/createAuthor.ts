import AppError from "../../classes/AppError";
import { db } from "../../drizzle/db";
import { AuthorTable } from "../../drizzle/schema/AuthorTable";
import { AuthorInsert, AuthorSelect } from "../../types/authorTypes";

export default async function createAuthor(data: AuthorInsert): Promise<AuthorSelect> {
	// Create author
	const [author] = await db.insert(AuthorTable).values(data).returning();

	// Check author
	if (!author) throw new AppError({ message: "Error creating author." });

	// Return author
	return author;
}
