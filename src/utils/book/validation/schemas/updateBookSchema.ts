import { z } from "zod/v4";
import { languageSchema } from "./languageSchema";

export const updateBookSchema = z
	.object({
		title: z.string().trim().nonempty("Title missing."),
		subtitle: z.string().trim().nonempty("Subtitle missing."),
		authors: z
			.array(z.string().trim().nonempty("Author data missing."))
			.min(1, "Author missing."),
		coverUrl: z.url(),
		pages: z.number().min(1, "Pages mut be a positive number."),
		language: languageSchema,
		isbn: z.string().trim().nonempty("ISBN missing."),
		genre: z.string().trim().nonempty("Genre missing."),
		description: z.string().trim().nonempty("Description missing."),
		releaseDate: z.iso.date("Invalid release date."),
	})
	.partial()
	.check((ctx) => {
		// Get release date
		const { releaseDate } = ctx.value;

		// Check release date
		if (releaseDate && new Date(releaseDate) > new Date()) {
			ctx.issues.push({
				code: "invalid_value",
				input: releaseDate,
				message: "Release date cannot be future.",
				values: [],
			});
		}
	});

export type UpdateBookData = z.infer<typeof updateBookSchema>;
