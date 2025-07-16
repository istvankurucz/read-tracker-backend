import { googleBooksClient } from "../../config/axios";
import { GoogleBook, GoogleBooksVolume } from "../../types/bookTypes";
import formatGoogleBooksVolumeToBook from "../../utils/book/formatting/formatGoogleBooksVolumeToBook";

export default async function getGoogleBook(id: string): Promise<GoogleBook> {
	// Get book
	const { data: response } = await googleBooksClient.get<GoogleBooksVolume>(`/${id}`);

	// Format response
	const book = formatGoogleBooksVolumeToBook(response);

	// Return book
	return book;
}
