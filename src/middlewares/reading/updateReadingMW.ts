import { Request, Response, NextFunction } from "express";
import { Reading } from "../../types/readingTypes";
import { UpdateReadingData } from "../../utils/reading/validation/schemas/updateReadingSchema";
import updateReading from "../../services/reading/updateReading";
import checkNonEmptyObject from "../../utils/general/checkNonEmptyObject";

export default async function updateReadingMW(_: Request, res: Response, next: NextFunction) {
	// Get reading and reading data
	const { reading, readingData } = res.locals as {
		reading: Reading;
		readingData: UpdateReadingData;
	};

	// Check reading data
	if (!checkNonEmptyObject(readingData)) return next();

	try {
		// Update reading
		const updatedReading = await updateReading(reading.id, {
			status: readingData.status,
			pages: readingData.pages,
			startedAt: readingData.startedAt ? new Date(readingData.startedAt) : undefined,
			finishedAt: readingData.finishedAt ? new Date(readingData.finishedAt) : undefined,
		});

		// Update reading in res.locals
		(res.locals.reading as Reading) = {
			...reading,
			...updatedReading,
		};

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
