import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { ReviewTable } from "../../drizzle/schema/ReviewTable";

export default async function deleteReview(id: string): Promise<void> {
	await db.delete(ReviewTable).where(eq(ReviewTable.id, id));
}
