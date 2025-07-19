import { BookResult } from "../../types/bookTypes";

export default function sortBookResults(books: BookResult[]): BookResult[] {
	return books.toSorted((a, b) => {
		// Source
		if (a.source === "local" && b.source === "google") return -1;
		if (a.source === "google" && b.source === "local") return 1;

		// Default
		return 0;
	});
}
