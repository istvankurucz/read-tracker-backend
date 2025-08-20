import { Request, Response, NextFunction } from "express";
import validateCreateReadingSnapshotData from "../../utils/readingSnapshot/validation/validateCreateReadingSnapshotData";
import { CreateReadingSnapshotData } from "../../utils/readingSnapshot/validation/schemas/createReadingSnapshotSchema";
import { LocalBook } from "../../types/bookTypes";

export default function validateCreateReadingSnapshotDataMW(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Get book
	const { book } = res.locals as { book: LocalBook };

	try {
		// Validation
		const snapshotData = validateCreateReadingSnapshotData(req.body, { maxPages: book.pages });

		console.log("Snapshot data:", snapshotData);

		// Add validated data to res.locals
		(res.locals.snapshotData as CreateReadingSnapshotData) = snapshotData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
