import AppError from "../../classes/AppError";
import { bookCoverPhotosBucket, supabaseAdmin } from "../../config/supabase";

export default async function deleteBookPhotoByBookId(bookId: string): Promise<void> {
	// Get book photo
	const { data, error: listError } = await supabaseAdmin.storage
		.from(bookCoverPhotosBucket)
		.list(bookId, {
			limit: 1,
		});

	// Check error
	if (listError != null) {
		throw new AppError({
			message: "Book cover photo not found.",
			details: listError.message,
			status: 404,
		});
	}

	// Check if book photo exists
	if (data == null || data.length === 0) {
		throw new AppError({
			message: "Book cover photo not found.",
			status: 404,
		});
	}

	// Get book photo
	const file = data[0];

	// Check if book photo exists
	if (file == undefined) {
		throw new AppError({
			message: "Book cover photo not found.",
			status: 404,
		});
	}

	// Delete file
	const { error: removeError } = await supabaseAdmin.storage
		.from(bookCoverPhotosBucket)
		.remove([`${bookId}/${file.name}`]);

	// Check if there was an error
	if (removeError != null) {
		throw new AppError({ message: "Error deleting book cover photo." });
	}
}
