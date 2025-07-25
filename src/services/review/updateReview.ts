import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { ReviewTable } from "../../drizzle/schema/ReviewTable";
import { ReviewSelect, ReviewUpdate } from "../../types/reviewTypes";
import AppError from "../../classes/AppError";

export default async function updateReview(id: string, data: ReviewUpdate): Promise<ReviewSelect> {
	// Update review
	const [review] = await db
		.update(ReviewTable)
		.set(data)
		.where(eq(ReviewTable.id, id))
		.returning();

	// Check review
	if (!review) throw new AppError({ message: "Error updating review." });

	// Return review
	return review;
}
