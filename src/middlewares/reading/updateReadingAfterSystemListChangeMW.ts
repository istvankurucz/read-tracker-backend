import { Request, Response, NextFunction } from "express";
import { LocalBook } from "../../types/bookTypes";
import { List } from "../../types/listTypes";
import { SystemListName } from "../../constants/list/systemListNames";
import { Reading } from "../../types/readingTypes";
import updateReading from "../../services/reading/updateReading";
import createReading from "../../services/reading/createReading";
import { UserSelect } from "../../types/userTypes";

export default async function updateReadingAfterSystemListChangeMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get user, book, lists before update, current lists and readings
	const { user, book, oldLists, lists, readings } = res.locals as {
		user: UserSelect;
		book: LocalBook;
		oldLists: List[];
		lists: List[];
		readings: Reading[];
	};

	// Get old and new system list
	const oldSystemList = oldLists.find(
		(list) => list.system && list.books.map((b) => b.id).includes(book.id)
	);
	const newSystemList = lists.find(
		(list) => list.system && list.books.map((b) => b.id).includes(book.id)
	);

	// Get in progress reading
	const inProgressReading = readings.find((reading) => reading.status === "in progress");

	// Book added to Currently Reading list
	if (
		(newSystemList?.name as SystemListName) === "Currently Reading" &&
		(oldSystemList?.name as SystemListName) !== "Currently Reading"
	) {
		// Check in progress reading
		if (inProgressReading) return next();

		try {
			// Create in progress reading
			await createReading({
				status: "in progress",
				pages: book.pages,
				startedAt: new Date(),
				bookId: book.id,
				userId: user.id,
			});
		} catch (err) {
			return next(err);
		}
	}

	// Book added to Finieshed list
	if (
		(newSystemList?.name as SystemListName) === "Finished" &&
		(oldSystemList?.name as SystemListName) !== "Finished"
	) {
		// Check in progress reading
		if (!inProgressReading) return next();

		try {
			// Update reading
			await updateReading(inProgressReading.id, { status: "finished", finishedAt: new Date() });
		} catch (err) {
			return next(err);
		}
	}

	// Book added to Not Finieshed list
	if (
		(newSystemList?.name as SystemListName) === "Not Finished" &&
		(oldSystemList?.name as SystemListName) !== "Not Finished"
	) {
		// Check in progress reading
		if (!inProgressReading) return next();

		try {
			// Update reading
			await updateReading(inProgressReading.id, {
				status: "not finished",
				finishedAt: new Date(),
			});
		} catch (err) {
			return next(err);
		}
	}

	// Go to next MW
	return next();
}
