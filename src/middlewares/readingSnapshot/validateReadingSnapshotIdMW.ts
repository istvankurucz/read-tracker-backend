import { Request, Response, NextFunction } from "express";
import validateUUID from "../../utils/general/validateUUID";
import AppError from "../../classes/AppError";

export default async function validateReadingSnapshotIdMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get snapshot ID
	const { snapshotId } = req.params;

	try {
		// Validation
		if (!validateUUID(snapshotId))
			throw new AppError({ message: "Invalid reading snapshot ID.", status: 400 });

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
