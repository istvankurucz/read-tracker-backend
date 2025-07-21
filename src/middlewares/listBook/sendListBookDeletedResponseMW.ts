import { Request, Response } from "express";

export default async function sendListBookDeletedResponseMW(_: Request, res: Response) {
	res.status(204).json({ message: "Book deleted from list." });
}
