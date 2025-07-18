export default function createBookComparisonString(book: {
	title: string;
	subtitle?: string | null;
	authors: string[];
}): string {
	// Format book data
	const title = book.title.toLowerCase();
	const subtitle = book.subtitle?.toLowerCase() ?? "";
	const authors = book.authors
		.map((author) => author.toLowerCase())
		.toSorted((a, b) => a.localeCompare(b));

	// Return comparison string
	return `${title} | ${subtitle} | ${authors}`;
}
