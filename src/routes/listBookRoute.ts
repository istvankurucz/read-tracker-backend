import { Router } from "express";
import authUserMW from "../middlewares/auth/authUserMW";
import validateListIdMW from "../middlewares/list/validateListIdMW";
import getAuthUserDataMW from "../middlewares/user/getAuthUserDataMW";
import checkListBookWriteAccessMW from "../middlewares/listBook/checkListBookWriteAccessMW";
import validateUpdateListBooksDataMW from "../middlewares/listBook/validateUpdateListBooksDataMW";
import createListBooksMW from "../middlewares/listBook/updateListBooksMW";
import getListMW from "../middlewares/list/getListMW";
import returnListMW from "../middlewares/list/returnListMW";

const router = Router({ mergeParams: true });

// Add MWs
router.use(authUserMW, getAuthUserDataMW, validateListIdMW, getListMW);

// Update books in list
router.put(
	"/",
	checkListBookWriteAccessMW,
	validateUpdateListBooksDataMW,
	createListBooksMW,
	returnListMW
);

export { router as listBookRoute };
