import { googleBooksClient } from "../../config/axios";
import { BookResult, GoogleBooksResponse } from "../../types/bookTypes";
import filterGoogleBooksResult from "../../utils/book/formatting/filterGoogleBooksResult";
import formatGoogleBooksResponseToBookResults from "../../utils/book/formatting/formatGoogleBooksResponseToBookResults";

export default async function searchGoogleBooks(options: {
	q: string;
	limit?: number;
}): Promise<BookResult[]> {
	// Extract options
	const { q, limit } = options;

	// Search books
	const { data: response } = await googleBooksClient.get<GoogleBooksResponse>(
		`?q=${q}${limit ? `&maxResults=${limit}` : ""}`
	);

	// Format response
	const formattedBooks = formatGoogleBooksResponseToBookResults(response);

	// Filter results
	const books = filterGoogleBooksResult(formattedBooks);

	// Return books
	return books;
}
