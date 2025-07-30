import { Request, Response } from "express";

export default function sendGoalDeletedResponseMW(_: Request, res: Response) {
	res.status(204).json({ message: "Goal deleted." });
}
