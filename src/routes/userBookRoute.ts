import { Router } from "express";
import authUserMW from "../middlewares/auth/authUserMW";
import validateUserIdMW from "../middlewares/user/validateUserIdMW";
import getAuthUserDataMW from "../middlewares/user/getAuthUserDataMW";
import getUserBooksMW from "../middlewares/book/getUserBooksMW";
import returnBooksMW from "../middlewares/book/returnBooksMW";
import getBookMW from "../middlewares/book/getBookMW";
import createUserBookMW from "../middlewares/userBook/createUserBookMW";
import returnBookMW from "../middlewares/book/returnBookMW";
import validateBookIdMW from "../middlewares/book/validateBookIdMW";
import createLocalBookFromGoogleBookMW from "../middlewares/book/createLocalBookFromGoogleBookMW";
import createBookAuthorsMW from "../middlewares/bookAuthor/createBookAuthorsMW";
import formatCreatedBookMW from "../middlewares/book/formatCreatedBookMW";

const router = Router({ mergeParams: true });

// Add MWs
router.use(authUserMW, validateUserIdMW, getAuthUserDataMW);

// Create user book
router.post(
	"/:bookId",
	validateBookIdMW,
	getBookMW,
	createLocalBookFromGoogleBookMW,
	createBookAuthorsMW,
	formatCreatedBookMW,
	createUserBookMW,
	returnBookMW
);

// Get user books
router.get("/", getUserBooksMW, returnBooksMW);

export { router as userBookRoute };
