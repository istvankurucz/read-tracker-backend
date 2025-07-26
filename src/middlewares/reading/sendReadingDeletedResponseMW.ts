import { Request, Response } from "express";

export default function sendReadingDeletedResponseMW(_: Request, res: Response) {
	res.status(204).json({ message: "Reading deleted." });
}
