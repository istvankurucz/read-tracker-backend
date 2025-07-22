import AppError from "../../classes/AppError";
import { db } from "../../drizzle/db";
import { ListTable } from "../../drizzle/schema/ListTable";
import { ListInsert, ListSelect } from "../../types/listTypes";

export default async function createList(data: ListInsert): Promise<ListSelect> {
	// Create list
	const [list] = await db.insert(ListTable).values(data).returning();

	// Check list
	if (!list) throw new AppError({ message: "Error creating list." });

	// Return list
	return list;
}
