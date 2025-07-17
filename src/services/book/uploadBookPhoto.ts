import AppError from "../../classes/AppError";
import { bookCoverPhotosBucket, supabase, supabaseAdmin } from "../../config/supabase";

export default async function uploadBookPhoto(
	file: Express.Multer.File,
	bookId: string
): Promise<{ url: string }> {
	// Upload file
	const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
		.from(bookCoverPhotosBucket)
		.upload(`${bookId}/${file.originalname}`, file.buffer);

	// Check error
	if (uploadError != null) {
		throw new AppError({
			message: "Error uploading book cover photo.",
			details: uploadError.message,
		});
	}

	// Get file public URL
	const {
		data: { publicUrl },
	} = supabase.storage.from(bookCoverPhotosBucket).getPublicUrl(uploadData.path);

	// Return public URL of file
	return { url: publicUrl };
}
