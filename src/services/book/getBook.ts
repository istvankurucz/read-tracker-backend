import { Book } from "../../types/bookTypes";
import validateUUID from "../../utils/general/validateUUID";
import getGoogleBook from "./getGoogleBook";
import getLocalBook from "./getLocalBook";

export default async function getBook(id: string): Promise<Book> {
	// Book from DB
	if (validateUUID(id)) {
		return await getLocalBook(id);
	}
	// Book from Google Books
	else {
		return await getGoogleBook(id);
	}
}
