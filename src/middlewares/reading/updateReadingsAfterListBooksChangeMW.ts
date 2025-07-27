import { Request, Response, NextFunction } from "express";
import { List } from "../../types/listTypes";
import { SystemListName } from "../../constants/list/systemListNames";
import getInProgressReadingByBookId from "../../services/reading/getInProgressReadingByBookId";
import AppError from "../../classes/AppError";
import createReading from "../../services/reading/createReading";
import getLocalBook from "../../services/book/getLocalBook";
import { UserSelect } from "../../types/userTypes";
import updateReading from "../../services/reading/updateReading";
import { ReadingStatus } from "../../constants/reading/readingStatusConstants";

export default async function updateReadingsAfterListBooksChangeMW(
	_: Request,
	res: Response,
	next: NextFunction
) {
	// Get user, list and new books
	const { user, list, newBookIds } = res.locals as {
		user: UserSelect;
		list: List;
		newBookIds: string[];
	};

	// Check system list
	if (!list.system) return next();

	// Currently Reading system list
	if ((list.name as SystemListName) === "Currently Reading") {
		for (const bookId of newBookIds) {
			try {
				// Get in progress reading
				await getInProgressReadingByBookId(bookId);
			} catch (err) {
				// In progress reading not found
				if (err instanceof AppError && err.status === 404) {
					// Get book
					const book = await getLocalBook(bookId);

					// Create in progress reading
					await createReading({
						status: "in progress",
						pages: book.pages,
						startedAt: new Date(),
						bookId: book.id,
						userId: user.id,
					});
				} else return next(err);
			}
		}
	}

	// Finished / Not Finished system lists
	if (
		(list.name as SystemListName) === "Finished" ||
		(list.name as SystemListName) === "Not Finished"
	) {
		for (const bookId of newBookIds) {
			try {
				// Get in progress reading
				const inProgressReading = await getInProgressReadingByBookId(bookId);

				// Get new status
				const newStatus: ReadingStatus =
					list.name === "Finished"
						? "finished"
						: list.name === "Not Finished"
						? "not finished"
						: "in progress";

				// Update reading
				await updateReading(inProgressReading.id, {
					status: newStatus,
					finishedAt: new Date(),
				});
			} catch (err) {
				// Not an in progress reading not found error
				if (!(err instanceof AppError && err.status === 404)) return next(err);
			}
		}
	}

	// Go to next MW
	return next();
}
