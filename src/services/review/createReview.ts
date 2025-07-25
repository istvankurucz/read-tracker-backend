import AppError from "../../classes/AppError";
import { db } from "../../drizzle/db";
import { ReviewTable } from "../../drizzle/schema/ReviewTable";
import { ReviewInsert, ReviewSelect } from "../../types/reviewTypes";

export default async function createReview(data: ReviewInsert): Promise<ReviewSelect> {
	// Create review
	const [review] = await db.insert(ReviewTable).values(data).returning();

	// Check review
	if (!review) throw new AppError({ message: "Error creating review." });

	// Return review
	return review;
}
