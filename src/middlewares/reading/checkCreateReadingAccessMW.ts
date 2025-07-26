import { Request, Response, NextFunction } from "express";
import { Reading } from "../../types/readingTypes";
import { CreateReadingData } from "../../utils/reading/validation/schemas/createReadingSchema";
import AppError from "../../classes/AppError";

export default function checkCreateReadingAccessMW(_: Request, res: Response, next: NextFunction) {
	// Get readings and reading data
	const { readings, readingData } = res.locals as {
		readings: Reading[];
		readingData: CreateReadingData;
	};

	// Get reading statuses
	const readingStatuses = readings.map((reading) => reading.status);

	try {
		// 2nd currently reading status
		if (readingStatuses.includes("in progress") && readingData.status === "in progress") {
			throw new AppError({
				message: "You cannot create another In progress reading.",
				status: 400,
			});
		}

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
