import { z } from "zod/v4";
import { languageSchema } from "./languageSchema";

export const createBookSchema = z
	.object({
		title: z.string().trim().nonempty("Title missing."),
		subtitle: z.string().trim().nonempty("Subtitle missing.").optional(),
		authors: z.array(z.uuid("Invalid author ID.")).min(1, "Author missing."),
		coverUrl: z.url().optional(),
		pages: z.number().min(1, "Pages mut be a positive number."),
		language: languageSchema,
		isbn: z.string().trim().nonempty("ISBN missing.").optional(),
		genre: z.string().trim().nonempty("Genre missing.").optional(),
		description: z.string().trim().nonempty("Description missing.").optional(),
		releaseDate: z.iso.date("Invalid release date.").optional(),
	})
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

export type CreateBookData = z.infer<typeof createBookSchema>;
