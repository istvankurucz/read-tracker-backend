import { Request, Response, NextFunction } from "express";
import { LocalBook } from "../../types/bookTypes";
import validateUpdateReadingSnapshotData from "../../utils/readingSnapshot/validation/validateUpdateReadingSnapshotData";
import { UpdateReadingSnapshotData } from "../../utils/readingSnapshot/validation/schemas/updateReadingSnapshotSchema";

export default function validateUpdateReadingSnapshotDataMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get book
	const { book } = res.locals as { book: LocalBook };

	try {
		// Validation
		const snapshotData = validateUpdateReadingSnapshotData(req.body, { maxPages: book.pages });

		// Add validated data to res.locals
		(res.locals.snapshotData as UpdateReadingSnapshotData) = snapshotData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
