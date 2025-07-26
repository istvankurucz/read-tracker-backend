import AppError from "../../classes/AppError";
import { db } from "../../drizzle/db";
import { ReadingTable } from "../../drizzle/schema/ReadingTable";
import { ReadingInsert, ReadingSelect } from "../../types/readingTypes";

export default async function createReading(data: ReadingInsert): Promise<ReadingSelect> {
	// Create reading
	const [reading] = await db.insert(ReadingTable).values(data).returning();

	// Check reading
	if (!reading) throw new AppError({ message: "Error creating reading." });

	// Return reading
	return reading;
}
