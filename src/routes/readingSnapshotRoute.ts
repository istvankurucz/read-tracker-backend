import { Router } from "express";
import authUserMW from "../middlewares/auth/authUserMW";
import getAuthUserDataMW from "../middlewares/user/getAuthUserDataMW";
import validateLocalBookIdMW from "../middlewares/book/validateLocalBookIdMW";
import getBookMW from "../middlewares/book/getBookMW";
import validateReadingIdMW from "../middlewares/reading/validateReadingIdMW";
import getReadingMW from "../middlewares/reading/getReadingMW";
import validateCreateReadingSnapshotDataMW from "../middlewares/readingSnapshot/validateCreateReadingSnapshotDataMW";
import createReadingSnapshotMW from "../middlewares/readingSnapshot/createReadingSnapshotMW";
import returnReadingSnapshotMW from "../middlewares/readingSnapshot/returnReadingSnapshotMW";
import validateReadingSnapshotIdMW from "../middlewares/readingSnapshot/validateReadingSnapshotIdMW";
import getReadingSnapshotMW from "../middlewares/readingSnapshot/getReadingSnapshotMW";
import deleteReadingSnapshotMW from "../middlewares/readingSnapshot/deleteReadingSnapshotMW";
import sendReadingSnapshotDeletedResponseMW from "../middlewares/readingSnapshot/sendReadingSnapshotDeletedResponseMW";
import validateUpdateReadingSnapshotDataMW from "../middlewares/readingSnapshot/validateUpdateReadingSnapshotDataMW";
import updateReadingSnapshotMW from "../middlewares/readingSnapshot/updateReadingSnapshotMW";
import updateReadingSnapshotBookSystemListMW from "../middlewares/listBook/updateReadingSnapshotBookSystemListMW";
import updateReadingStatusMW from "../middlewares/reading/updateReadingStatusMW";

const router = Router({ mergeParams: true });

// Add MWs
router.use(
	authUserMW,
	getAuthUserDataMW,
	validateLocalBookIdMW,
	getBookMW,
	validateReadingIdMW,
	getReadingMW
);

// Create reading snapshot
router.post(
	"/",
	validateCreateReadingSnapshotDataMW,
	createReadingSnapshotMW,
	updateReadingStatusMW,
	updateReadingSnapshotBookSystemListMW,
	returnReadingSnapshotMW
);

// Get reading snapshot
router.get(
	"/:snapshotId",
	validateReadingSnapshotIdMW,
	getReadingSnapshotMW,
	returnReadingSnapshotMW
);

// Update reading snapshot
router.put(
	"/:snapshotId",
	validateReadingSnapshotIdMW,
	getReadingSnapshotMW,
	validateUpdateReadingSnapshotDataMW,
	updateReadingSnapshotMW,
	updateReadingStatusMW,
	updateReadingSnapshotBookSystemListMW,
	returnReadingSnapshotMW
);

// Delete reading snapshot
router.delete(
	"/:snapshotId",
	validateReadingSnapshotIdMW,
	getReadingSnapshotMW,
	deleteReadingSnapshotMW,
	sendReadingSnapshotDeletedResponseMW
);

export { router as readingSnapshotRoute };
