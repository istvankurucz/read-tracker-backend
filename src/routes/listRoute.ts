import { Router } from "express";
import authUserMW from "../middlewares/auth/authUserMW";
import getAuthUserDataMW from "../middlewares/user/getAuthUserDataMW";
import getUserListsMW from "../middlewares/list/getUserListsMW";
import returnListsMW from "../middlewares/list/returnListsMW";
import validateListIdMW from "../middlewares/list/validateListIdMW";
import getListMW from "../middlewares/list/getListMW";
import returnListMW from "../middlewares/list/returnListMW";

const router = Router({ mergeParams: true });

// Add MWs
router.use(authUserMW, getAuthUserDataMW);

// Get user lists
router.get("/", getUserListsMW, returnListsMW);

// Get list
router.get("/:listId", validateListIdMW, getListMW, returnListMW);

export { router as listRoute };
