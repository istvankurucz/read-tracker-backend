import { Router } from "express";
import authUserMW from "../middlewares/auth/authUserMW";
import getAuthUserDataMW from "../middlewares/user/getAuthUserDataMW";
import getUserListsMW from "../middlewares/list/getUserListsMW";
import returnListsMW from "../middlewares/list/returnListsMW";
import validateListIdMW from "../middlewares/list/validateListIdMW";
import getListMW from "../middlewares/list/getListMW";
import returnListMW from "../middlewares/list/returnListMW";
import validateCreateListDataMW from "../middlewares/list/validateCreateListDataMW";
import createListMW from "../middlewares/list/createListMW";
import getListWithUserIdMW from "../middlewares/list/getListWithUserIdMW";
import checkListWriteAccessMW from "../middlewares/list/checkListWriteAccessMW";
import validateUpdateListDataMW from "../middlewares/list/validateUpdateListDataMW";
import updateListMW from "../middlewares/list/updateListMW";
import getListSelectMW from "../middlewares/list/getListSelectMW";
import deleteListMW from "../middlewares/list/deleteListMW";
import sendListDeletedResponseMW from "../middlewares/list/sendListDeletedResponseMW";

const router = Router({ mergeParams: true });

// Add MWs
router.use(authUserMW, getAuthUserDataMW);

// Create list
router.post("/", validateCreateListDataMW, createListMW, returnListMW);

// Get user lists
router.get("/", getUserListsMW, returnListsMW);

// Get list
router.get("/:listId", validateListIdMW, getListMW, returnListMW);

// Update list
router.put(
	"/:listId",
	validateListIdMW,
	getListWithUserIdMW,
	checkListWriteAccessMW,
	validateUpdateListDataMW,
	updateListMW,
	returnListMW
);

router.delete(
	"/:listId",
	validateListIdMW,
	getListSelectMW,
	checkListWriteAccessMW,
	deleteListMW,
	sendListDeletedResponseMW
);

export { router as listRoute };
