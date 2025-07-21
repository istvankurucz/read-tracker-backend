import { Request, Response } from "express";
import { List } from "../../types/listTypes";

export default async function returnListMW(_: Request, res: Response) {
	// Get list
	const { list } = res.locals as { list: List };

	// Return list
	res.status(200).json(list);
}
