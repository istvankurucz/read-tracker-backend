import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { ReadingTable } from "../../drizzle/schema/ReadingTable";
import { ReadingSelect, ReadingUpdate } from "../../types/readingTypes";
import AppError from "../../classes/AppError";

export default async function updateReading(
	id: string,
	data: ReadingUpdate
): Promise<ReadingSelect> {
	// Update reading
	const [reading] = await db
		.update(ReadingTable)
		.set(data)
		.where(eq(ReadingTable.id, id))
		.returning();

	// Check reading
	if (!reading) throw new AppError({ message: "Error updating reading." });

	// Return reading
	return reading;
}
