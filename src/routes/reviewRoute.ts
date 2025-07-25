import { Router } from "express";
import authUserMW from "../middlewares/auth/authUserMW";
import getAuthUserDataMW from "../middlewares/user/getAuthUserDataMW";
import validateCreateReviewDataMW from "../middlewares/review/validateCreateReviewDataMW";
import validateLocalBookIdMW from "../middlewares/book/validateLocalBookIdMW";
import getBookMW from "../middlewares/book/getBookMW";
import returnReviewMW from "../middlewares/review/returnReviewMW";
import createReviewMW from "../middlewares/review/createReviewMW";
import getBookReviewsMW from "../middlewares/review/getBookReviewsMW";
import returnReviewsMW from "../middlewares/review/returnReviewsMW";
import validateReviewIdMW from "../middlewares/review/validateReviewIdMW";
import getReviewMW from "../middlewares/review/getReviewMW";
import checkReviewWriteAccessMW from "../middlewares/review/checkReviewWriteAccessMW";
import validateUpdateReviewDataMW from "../middlewares/review/validateUpdateReviewDataMW";
import updateReviewMW from "../middlewares/review/updateReviewMW";
import deleteReviewMW from "../middlewares/review/deleteReviewMW";
import sendReviewDeletedResponseMW from "../middlewares/review/sendReviewDeletedResponseMW";

const router = Router({ mergeParams: true });

// Add MWs
router.use(authUserMW, getAuthUserDataMW, validateLocalBookIdMW, getBookMW);

// Create review
router.post("/", validateCreateReviewDataMW, createReviewMW, returnReviewMW);

// Get review
router.get("/:reviewId", validateReviewIdMW, getReviewMW, returnReviewMW);

// Get book reviews
router.get("/", getBookReviewsMW, returnReviewsMW);

// Update review
router.put(
	"/:reviewId",
	validateReviewIdMW,
	getReviewMW,
	checkReviewWriteAccessMW,
	validateUpdateReviewDataMW,
	updateReviewMW,
	returnReviewMW
);

// Delete review
router.delete(
	"/:reviewId",
	validateReviewIdMW,
	getReviewMW,
	checkReviewWriteAccessMW,
	deleteReviewMW,
	sendReviewDeletedResponseMW
);

export { router as reviewRoute };
