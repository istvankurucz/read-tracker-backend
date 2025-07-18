import { BookResult } from "../../types/bookTypes";
import createBookComparisonString from "./createBookComparisonString";

type BookResultWithComparison = BookResult & { comparison: string };

//#region Functions
function deduplicateBooksByComparisonField(
	books: BookResultWithComparison[]
): BookResultWithComparison[] {
	// Intialize variables
	const seenComparisonValues = new Set<string>();
	const filteredBooks: BookResultWithComparison[] = [];

	// Filter books by comparison field
	for (const book of books) {
		// New comparison value
		if (!seenComparisonValues.has(book.comparison)) {
			seenComparisonValues.add(book.comparison);
			filteredBooks.push(book);
		}
		// Book is local
		else if (book.source === "local") {
			// Replace
			const index = filteredBooks.findIndex((b) => b.comparison === book.comparison);
			if (index !== -1) filteredBooks[index] = book;
		}
	}

	// Return books
	return filteredBooks;
}

function removeComparisonField(book: BookResultWithComparison): BookResult {
	// Extract comparison field
	const { comparison, ...rest } = book;

	// Return rest
	return rest;
}
//#endregion

export default function deduplicateBookResults(books: {
	local: BookResult[];
	google: BookResult[];
}): BookResult[] {
	// Extract books
	const { local, google } = books;

	// Merge books
	const allBooks = [...local, ...google];

	// Create comparison field
	const booksWithComparison: BookResultWithComparison[] = allBooks.map((book) => ({
		...book,
		comparison: createBookComparisonString(book),
	}));

	// Filter books
	const filteredBooks = deduplicateBooksByComparisonField(booksWithComparison);

	// Format books
	const formattedBooks = filteredBooks.map((book) => removeComparisonField(book));

	// Return books
	return formattedBooks;
}
