import AppError from "../../classes/AppError";
import { db } from "../../drizzle/db";
import { ListSelect } from "../../types/listTypes";

export default async function getListSelect(id: string): Promise<ListSelect> {
	// Get list
	const list = await db.query.ListTable.findFirst({
		where: (list, { eq }) => eq(list.id, id),
	});

	// Check list
	if (!list) throw new AppError({ message: "List not found.", status: 404 });

	// Return list
	return list;
}
