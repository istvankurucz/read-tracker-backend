import { z } from "zod/v4";
import { goalTypeSchema } from "./goalTypeSchema";

export const createGoalSchema = z
	.object({
		target: z.int().min(1, "Target must be min 1."),
		type: goalTypeSchema,
		year: z.number().positive("Year must be positive"),
		month: z
			.union([
				z.int().min(0, "Month must be min 0.").max(11, "Month cannot greater than 12."),
				z.null(),
			])
			.optional(),
		week: z
			.union([
				z.int().min(0, "Week must be min 0.").max(51, "Week cannot be greater than 52."),
				z.null(),
			])
			.optional(),
	})
	.check((ctx) => {
		// Get date values
		const { type, month, week } = ctx.value;

		// Yearly goal
		if (type === "yearly" && month != null) {
			ctx.issues.push({
				code: "invalid_value",
				input: month,
				path: ["month"],
				message: "Month must be null for yearly goal.",
				values: [],
			});
		}
		if (type === "yearly" && week != null) {
			ctx.issues.push({
				code: "invalid_value",
				input: week,
				path: ["week"],
				message: "Week must be null for yearly goal.",
				values: [],
			});
		}

		// Monthly goal
		if (type === "monthly" && month == null) {
			ctx.issues.push({
				code: "invalid_value",
				input: month,
				path: ["month"],
				message: "Month missing.",
				values: [],
			});
		}
		if (type === "monthly" && week != null) {
			ctx.issues.push({
				code: "invalid_value",
				input: week,
				path: ["week"],
				message: "Week must be null for monthly goal.",
				values: [],
			});
		}

		// Weekly goal
		if (type === "weekly" && week == null) {
			ctx.issues.push({
				code: "invalid_value",
				input: week,
				path: ["week"],
				message: "Week missing.",
				values: [],
			});
		}
		if (type === "weekly" && month != null) {
			ctx.issues.push({
				code: "invalid_value",
				input: month,
				path: ["month"],
				message: "Week must be null for weekly goal.",
				values: [],
			});
		}
	});
export type CreateGoalData = z.infer<typeof createGoalSchema>;
