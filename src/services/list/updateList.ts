import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { ListTable } from "../../drizzle/schema/ListTable";
import { ListSelect, ListUpdate } from "../../types/listTypes";
import AppError from "../../classes/AppError";

export default async function updateList(id: string, data: ListUpdate): Promise<ListSelect> {
	// Update list
	const [list] = await db.update(ListTable).set(data).where(eq(ListTable.id, id)).returning();

	// Check list
	if (!list) throw new AppError({ message: "Error updating list." });

	// Return list
	return list;
}
