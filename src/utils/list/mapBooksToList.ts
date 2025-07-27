import { LocalBook } from "../../types/bookTypes";
import { List, ListSelect } from "../../types/listTypes";

type ListInput = Omit<ListSelect, "userId">;

export default function mapBooksToList(
	list: ListInput,
	options: { books: LocalBook[]; joins: { bookId: string; listId: string }[] }
): List {
	// Extract options
	const { books, joins } = options;

	// List book IDs
	const listBookIds = joins.filter((join) => join.listId === list.id).map((join) => join.bookId);

	// List books
	const listBooks = books.filter((book) => listBookIds.includes(book.id));

	// Return list
	return { ...list, books: listBooks };
}
