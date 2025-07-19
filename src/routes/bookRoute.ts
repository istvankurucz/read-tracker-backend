import { Router } from "express";
import authUserMW from "../middlewares/auth/authUserMW";
import validateBookSearchDataMW from "../middlewares/book/validateBookSearchDataMW";
import searchLocalBooksMW from "../middlewares/book/searchLocalBooksMW";
import searchGoogleBooksMW from "../middlewares/book/searchGoogleBooksMW";
import deduplicateBookResultsMW from "../middlewares/book/deduplicateBookResultsMW";
import returnBookResultsMW from "../middlewares/book/returnBookResultsMW";
import sortBookResultsMW from "../middlewares/book/sortBookResultsMW";
import validateBookIdMW from "../middlewares/book/validateBookIdMW";
import getBookMW from "../middlewares/book/getBookMW";
import returnBookMW from "../middlewares/book/returnBookMW";
import imageUploadMW from "../middlewares/helper/imageUploadMW";
import validateCreateBookDataMW from "../middlewares/book/validateCreateBookDataMW";
import getAuthUserDataMW from "../middlewares/user/getAuthUserDataMW";
import createBookMW from "../middlewares/book/createBookMW";
import createBookAuthorsMW from "../middlewares/bookAuthor/createBookAuthorsMW";
import formatCreatedBookMW from "../middlewares/book/formatCreatedBookMW";
import createBookCoverPhotoMW from "../middlewares/book/createBookCoverPhotoMW";
import validateLocalBookIdMW from "../middlewares/book/validateLocalBookIdMW";
import checkBookUpdateAccessMW from "../middlewares/book/checkBookUpdateAccessMW";
import validateUpdateBookDataMW from "../middlewares/book/validateUpdateBookDataMW";
import updateBookPhotoMW from "../middlewares/book/updateBookPhotoMW";
import updateBookMW from "../middlewares/book/updateBookMW";
import updateBookAuthorsMW from "../middlewares/bookAuthor/updateBookAuthorsMW";
import getUserBooksMW from "../middlewares/book/getUserBooksMW";
import returnBooksMW from "../middlewares/book/returnBooksMW";
import createUserBookMW from "../middlewares/userBook/createUserBookMW";
import checkBookDeleteAccessMW from "../middlewares/book/checkBookDeleteAccessMW";
import deleteBookCoverPhotoMW from "../middlewares/book/deleteBookCoverPhotoMW";
import deleteBookMW from "../middlewares/book/deleteBookMW";
import sendBookDeletedResponseMW from "../middlewares/book/sendBookDeletedResponseMW";

const router = Router();

// Add MWs
router.use(authUserMW, getAuthUserDataMW);

// Create book
router.post(
	"/",
	imageUploadMW,
	validateCreateBookDataMW,
	createBookMW,
	createBookCoverPhotoMW,
	updateBookMW,
	createBookAuthorsMW,
	formatCreatedBookMW,
	createUserBookMW,
	returnBookMW
);

// Search books
router.get(
	"/search",
	validateBookSearchDataMW,
	searchLocalBooksMW,
	searchGoogleBooksMW,
	deduplicateBookResultsMW,
	sortBookResultsMW,
	returnBookResultsMW
);

// Get books added by user
router.get("/user", getUserBooksMW, returnBooksMW);

// Get book
router.get("/:bookId", validateBookIdMW, getBookMW, returnBookMW);

// Update book
router.put(
	"/:bookId",
	validateLocalBookIdMW,
	getBookMW,
	checkBookUpdateAccessMW,
	imageUploadMW,
	validateUpdateBookDataMW,
	updateBookPhotoMW,
	updateBookMW,
	updateBookAuthorsMW,
	returnBookMW
);

// Delete book
router.delete(
	"/:bookId",
	validateLocalBookIdMW,
	getBookMW,
	checkBookDeleteAccessMW,
	deleteBookCoverPhotoMW,
	deleteBookMW,
	sendBookDeletedResponseMW
);

export { router as bookRoute };
