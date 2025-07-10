import { Request, Response } from "express";

export default function sendUserDeletedResponseMW(_: Request, res: Response) {
	res.status(204).json({ message: "User deleted." });
}
