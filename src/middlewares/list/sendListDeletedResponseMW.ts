import { Request, Response } from "express";

export default function sendListDeletedResponseMW(_: Request, res: Response) {
	res.status(204).json({ message: "List deleted." });
}
