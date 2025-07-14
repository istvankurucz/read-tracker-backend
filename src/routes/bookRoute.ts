import { Router } from "express";
import authUserMW from "../middlewares/auth/authUserMW";
import getUserMW from "../middlewares/user/getUserMW";
import validateBookSearchDataMW from "../middlewares/book/validateBookSearchDataMW";
import searchLocalBooksMW from "../middlewares/book/searchLocalBooksMW";
import searchGoogleBooksMW from "../middlewares/book/searchGoogleBooksMW";
import deduplicateBookResultsMW from "../middlewares/book/deduplicateBookResultsMW";
import returnBookResultsMW from "../middlewares/book/returnBookResultsMW";
import sortBookResultsMW from "../middlewares/book/sortBookResultsMW";
import validateBookIdMW from "../middlewares/book/validateBookIdMW";
import getBookMW from "../middlewares/book/getBookMW";
import returnBookMW from "../middlewares/book/returnBookMW";

const router = Router();

// Add MWs
router.use(authUserMW);

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

export { router as bookRoute };
