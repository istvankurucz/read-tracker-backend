import { Request, Response } from "express";

export default function sendReadingSnapshotDeletedResponseMW(_: Request, res: Response) {
	res.status(204).json({ message: "Reading snapshot deleted." });
}
