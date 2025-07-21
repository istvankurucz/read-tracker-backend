import { Request, Response } from "express";
import { List } from "../../types/listTypes";

export default async function returnListsMW(_: Request, res: Response) {
	// Get lists
	const { lists } = res.locals as { lists: List[] };

	// Return lists
	res.status(200).json(lists);
}
