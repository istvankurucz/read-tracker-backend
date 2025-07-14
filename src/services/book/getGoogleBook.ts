import { googleBooksClient } from "../../config/axios";
import { Book, GoogleBooksVolume } from "../../types/bookTypes";
import formatGoogleBooksVolumeToBook from "../../utils/book/formatting/formatGoogleBooksVolumeToBook";

export default async function getGoogleBook(id: string): Promise<Book> {
	// Get book
	const { data: response } = await googleBooksClient.get<GoogleBooksVolume>(`/${id}`);

	// Format response
	const book = formatGoogleBooksVolumeToBook(response);

	// Return book
	return book;
}
