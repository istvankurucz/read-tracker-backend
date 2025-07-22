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
import createGoogleBookAuthorsMW from "../middlewares/book/createGoogleBookAuthorsMW";
import formatCreatedLocalBookMW from "../middlewares/book/formatCreatedLocalBookMW";
import validateLocalBookIdMW from "../middlewares/book/validateLocalBookIdMW";
import deleteUserBookMW from "../middlewares/userBook/deleteUserBookMW";
import sendUserBookDeletedResponseMW from "../middlewares/userBook/sendUserBookDeletedResponseMW";

const router = Router({ mergeParams: true });

// Add MWs
router.use(authUserMW, /* validateUserIdMW, */ getAuthUserDataMW);

// Create user book
router.post(
	"/:bookId",
	validateBookIdMW,
	getBookMW,
	createLocalBookFromGoogleBookMW,
	createGoogleBookAuthorsMW,
	formatCreatedLocalBookMW,
	createUserBookMW,
	returnBookMW
);

// Get user books
router.get("/", getUserBooksMW, returnBooksMW);

// Delete user book
router.delete(
	"/:bookId",
	validateLocalBookIdMW,
	getBookMW,
	deleteUserBookMW,
	// Delete book reading
	sendUserBookDeletedResponseMW
);

export { router as userBookRoute };
