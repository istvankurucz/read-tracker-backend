import { BookResult } from "../../types/bookTypes";

export default function sortBookResults(books: BookResult[]): BookResult[] {
	return books.toSorted((a, b) => {
		// No authors
		if (a.authors.length === 0 && b.authors.length !== 0) return 1;
		if (a.authors.length !== 0 && b.authors.length === 0) return -1;

		// No cover photo
		if (a.coverUrl === "" && b.coverUrl !== "") return 1;
		if (a.coverUrl !== "" && b.coverUrl === "") return -1;

		// Default
		return 0;
	});
}
