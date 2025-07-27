import { z } from "zod/v4";

export function updateReadingSnapshotSchema(params: { maxPages: number }) {
	// Extract params
	const { maxPages } = params;

	// Return schema
	return z
		.object({
			page: z
				.number()
				.min(0, "Pages must be positive.")
				.max(maxPages, "Page must be lower than book pages."),
			timestamp: z.iso.date("Invalid date."),
			time: z.union([z.number().min(0, "Time must be positive."), z.null()]),
		})
		.partial()
		.check((ctx) => {
			// Get timestamp
			const { timestamp } = ctx.value;

			// Start date future
			if (timestamp && new Date(timestamp) > new Date()) {
				ctx.issues.push({
					code: "invalid_value",
					input: timestamp,
					path: ["timestamp"],
					message: "Reading date cannot be future.",
					values: [],
				});
			}
		});
}
export type UpdateReadingSnapshotData = z.infer<ReturnType<typeof updateReadingSnapshotSchema>>;
