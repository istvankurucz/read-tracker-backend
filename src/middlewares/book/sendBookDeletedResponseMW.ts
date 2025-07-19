import { Request, Response } from "express";

export default function sendBookDeletedResponseMW(_: Request, res: Response) {
	res.status(204).json({ message: "Book deleted." });
}
