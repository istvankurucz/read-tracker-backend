import { z } from "zod/v4";
import { readingStatusSchema } from "./readingStatusSchema";

export const updateReadingSchema = z
	.object({
		status: readingStatusSchema,
		pages: z.number().min(1, "Page count mus be min 1.").optional(),
		startedAt: z.iso.date("Invalid start date."),
		finishedAt: z.union([z.iso.date("Invalid finish date."), z.null()]),
	})
	.partial()
	.check((ctx) => {
		// Get dates
		const { status, startedAt, finishedAt } = ctx.value;

		// Started ad future
		if (startedAt && new Date(startedAt) > new Date()) {
			ctx.issues.push({
				code: "invalid_value",
				input: startedAt,
				path: ["startedAt"],
				message: "Start date cannot be future.",
				values: [],
			});
		}

		// Finished ad future
		if (finishedAt && new Date(finishedAt) > new Date()) {
			ctx.issues.push({
				code: "invalid_value",
				input: finishedAt,
				path: ["finishedAt"],
				message: "Finish date cannot be future.",
				values: [],
			});
		}

		// Finish date is later than start date
		if (startedAt && finishedAt && new Date(startedAt) > new Date(finishedAt)) {
			ctx.issues.push({
				code: "invalid_value",
				input: finishedAt,
				path: ["finishedAt"],
				message: "Finish date cannot be earlier than start date.",
				values: [],
			});
		}

		// In progress status finish date
		if (status === "in progress" && finishedAt != null) {
			ctx.issues.push({
				code: "invalid_value",
				input: finishedAt,
				path: ["finishedAt"],
				message: "Finish date must be unknown if you are currently reading the book.",
				values: [],
			});
		}

		// Finished status finish date
		if ((status === "finished" || status === "not finished") && finishedAt == null) {
			ctx.issues.push({
				code: "invalid_value",
				input: finishedAt,
				path: ["finishedAt"],
				message: "Finish date missing.",
				values: [],
			});
		}
	});

export type UpdateReadingData = z.infer<typeof updateReadingSchema>;
