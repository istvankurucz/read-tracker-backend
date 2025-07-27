import { Request, Response, NextFunction } from "express";
import { Reading } from "../../types/readingTypes";
import { List } from "../../types/listTypes";

const TIME_2DAYS = 1000 * 60 * 60 * 24 * 2;

export default async function getLatestUserReadingsMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get user readings and Currently Reading list
	const { readings, currentlyReadingList } = res.locals as {
		readings: Reading[];
		currentlyReadingList: List;
	};

	// Get currently reading book IDs
	const currentlyReadingBookIds = currentlyReadingList.books.map((book) => book.id);

	// Get readings the book they belong to is in Currently Reading list
	const latestReadings = readings.filter((reading) => {
		// Check reading status
		if (reading.status !== "in progress") return false;

		// Book is in Currenlty Reading list
		if (currentlyReadingBookIds.includes(reading.book.id)) return true;

		// Latest snapshot is within 2 days
		const latestSnapshot = reading.snapshots[0];
		if (!latestSnapshot) return false;
		if (new Date().getTime() - latestSnapshot.timestamp.getTime() < TIME_2DAYS) return true;

		// Default
		return false;
	});

	// Add latest readings to res.locals
	(res.locals.readings as Reading[]) = latestReadings;

	// Go to next MW
	return next();
}
