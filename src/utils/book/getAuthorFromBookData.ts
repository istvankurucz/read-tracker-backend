import AppError from "../../classes/AppError";
import createAuthor from "../../services/author/createAuthor";
import getAuthor from "../../services/author/getAuthor";
import getAuthorByName from "../../services/author/getAuthorByName";
import { AuthorSelect } from "../../types/authorTypes";
import validateUUID from "../general/validateUUID";

export default async function getAuthorFromBookData(authorData: string): Promise<AuthorSelect> {
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
			return await createAuthor({ name: authorData });
		}

		// Throw error
		throw err;
	}
}
