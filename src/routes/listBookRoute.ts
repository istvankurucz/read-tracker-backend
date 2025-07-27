import { Router } from "express";
import authUserMW from "../middlewares/auth/authUserMW";
import validateListIdMW from "../middlewares/list/validateListIdMW";
import getAuthUserDataMW from "../middlewares/user/getAuthUserDataMW";
import checkListBookWriteAccessMW from "../middlewares/listBook/checkListBookWriteAccessMW";
import validateUpdateListBooksDataMW from "../middlewares/listBook/validateUpdateListBooksDataMW";
import updateListBooksMW from "../middlewares/listBook/updateListBooksMW";
import returnListMW from "../middlewares/list/returnListMW";
import validateLocalBookIdMW from "../middlewares/book/validateLocalBookIdMW";
import getBookMW from "../middlewares/book/getBookMW";
import getListSelectMW from "../middlewares/list/getListSelectMW";
import deleteListBookMW from "../middlewares/listBook/deleteListBookMW";
import sendListBookDeletedResponseMW from "../middlewares/listBook/sendListBookDeletedResponseMW";
import getListWithUserIdMW from "../middlewares/list/getListWithUserIdMW";
import updateReadingsAfterListBooksChangeMW from "../middlewares/reading/updateReadingsAfterListBooksChangeMW";
import getUserSystemListsMW from "../middlewares/list/getUserSystemListsMW";
import deleteListBooksFromOldSystemListMW from "../middlewares/list/deleteListBooksFromOldSystemListMW";

const router = Router({ mergeParams: true });

// Add MWs
router.use(authUserMW, getAuthUserDataMW, validateListIdMW);

// Update books in list
router.put(
	"/",
	getListWithUserIdMW,
	checkListBookWriteAccessMW,
	validateUpdateListBooksDataMW,
	getUserSystemListsMW,
	updateListBooksMW,
	deleteListBooksFromOldSystemListMW,
	updateReadingsAfterListBooksChangeMW,
	returnListMW
);

// Delete book from list
router.delete(
	"/:bookId",
	getListSelectMW,
	validateLocalBookIdMW,
	getBookMW,
	checkListBookWriteAccessMW,
	deleteListBookMW,
	sendListBookDeletedResponseMW
);

export { router as listBookRoute };
