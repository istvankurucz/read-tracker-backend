import { Request, Response } from "express";

export default function sendUserBookDeletedResponseMW(_: Request, res: Response) {
	res.status(204).json({ message: "User book deleted." });
}
