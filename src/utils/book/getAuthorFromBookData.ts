import AppError from "../../classes/AppError";
import createAuthor from "../../services/author/createAuthor";
import getAuthor from "../../services/author/getAuthor";
import getAuthorByName from "../../services/author/getAuthorByName";
import { Author } from "../../types/authorTypes";
import validateUUID from "../general/validateUUID";

export default async function getAuthorFromBookData(
	authorData: string,
	options: { userId: string }
): Promise<Author> {
	// Extract options
	const { userId } = options;

	// Author data is a UUID -> existing author
	if (validateUUID(authorData)) {
		// Get author
		return await getAuthor(authorData);
	}

	// Author data is a name -> search in DB first
	try {
		// Get author by name
		return await getAuthorByName(authorData);
	} catch (err) {
		// Check not found error
		if (err instanceof AppError && err.status === 404) {
			// Create author
			const { userId: uid, ...author } = await createAuthor({ name: authorData, userId });

			// Return author
			return author;
		}

		// Throw error
		throw err;
	}
}
