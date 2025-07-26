import { Router } from "express";
import authUserMW from "../middlewares/auth/authUserMW";
import getAuthUserDataMW from "../middlewares/user/getAuthUserDataMW";
import validateLocalBookIdMW from "../middlewares/book/validateLocalBookIdMW";
import getBookMW from "../middlewares/book/getBookMW";
import getBookReadingsMW from "../middlewares/reading/getBookReadingsMW";
import returnReadingsMW from "../middlewares/reading/returnReadingsMW";
import validateCreateReadingDataMW from "../middlewares/reading/validateCreateReadingDataMW";
import checkCreateReadingAccessMW from "../middlewares/reading/checkCreateReadingAccessMW";
import createReadingMW from "../middlewares/reading/createReadingMW";
import returnReadingMW from "../middlewares/reading/returnReadingMW";
import validateReadingIdMW from "../middlewares/reading/validateReadingIdMW";
import getReadingMW from "../middlewares/reading/getReadingMW";
import validateUpdateReadingDataMW from "../middlewares/reading/validateUpdateReadingDataMW";
import updateReadingMW from "../middlewares/reading/updateReadingMW";
import deleteReadingMW from "../middlewares/reading/deleteReadingMW";
import sendReadingDeletedResponseMW from "../middlewares/reading/sendReadingDeletedResponseMW";

const router = Router({ mergeParams: true });

// Add MWs
router.use(authUserMW, getAuthUserDataMW, validateLocalBookIdMW, getBookMW);

// Create reading
router.post(
	"/",
	validateCreateReadingDataMW,
	getBookReadingsMW,
	checkCreateReadingAccessMW,
	createReadingMW,
	returnReadingMW
);

// Get reading
router.get("/:readingId", validateReadingIdMW, getReadingMW, returnReadingMW);

// Get readings of book
router.get("/", getBookReadingsMW, returnReadingsMW);

// Update reading
router.put(
	"/:readingId",
	validateReadingIdMW,
	getReadingMW,
	validateUpdateReadingDataMW,
	updateReadingMW,
	returnReadingMW
);

// Delete reading
router.delete(
	"/:readingId",
	validateReadingIdMW,
	getReadingMW,
	deleteReadingMW,
	sendReadingDeletedResponseMW
);

export { router as readingRoute };
