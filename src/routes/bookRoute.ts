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
	updateBookMW, // Update book cover photo
	createBookAuthorsMW,
	formatCreatedBookMW,
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

export { router as bookRoute };
