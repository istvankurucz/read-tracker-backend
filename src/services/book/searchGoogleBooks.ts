import { googleBooksClient } from "../../config/axios";
import { BookResult, GoogleBooksResponse } from "../../types/bookTypes";
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
	const books = formatGoogleBooksResponseToBookResults(response);

	// Return books
	return books;
}
