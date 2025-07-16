import { BookResult } from "../../../types/bookTypes";

export default function filterGoogleBooksResult(books: BookResult[]): BookResult[] {
	return books.filter((book) => book.coverUrl !== "" && book.authors.length !== 0);
}
