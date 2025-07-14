import { BookResult, GoogleBooksResponse } from "../../../types/bookTypes";

export default function formatGoogleBooksResponseToBookResults(
	response: GoogleBooksResponse
): BookResult[] {
	// No items
	if (!response.items || response.items.length === 0) return [];

	// Format items
	const books: BookResult[] = response.items.map((item) => {
		return {
			id: item.id,
			title: item.volumeInfo.title,
			subtitle: item.volumeInfo.subtitle ?? null,
			coverUrl: item.volumeInfo.imageLinks?.thumbnail ?? "",
			authors: item.volumeInfo.authors ?? [],
			source: "google",
		};
	});

	// Return books
	return books;
}
