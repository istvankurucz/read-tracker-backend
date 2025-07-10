import { Router } from "express";
import authUserMW from "../middlewares/auth/auth/authUserMW";
import validateCreateUserDataMW from "../middlewares/user/validateCreateUserDataMW";
import createUserMW from "../middlewares/user/createUserMW";
import returnUserMW from "../middlewares/user/returnUserMW";
import validateUserIdMW from "../middlewares/user/validateUserIdMW";
import getUserMW from "../middlewares/user/getUserMW";
import checkUserUpdateAccessMW from "../middlewares/user/checkUpdateUserAccessMW";
import validateUpdateUserDataMW from "../middlewares/user/validateUpdateUserDataMW";
import updateUserMW from "../middlewares/user/updateUserMW";
import checkDeleteUserAccessMW from "../middlewares/user/checkDeleteUserAccessMW";
import deleteUserMW from "../middlewares/user/deleteUserMW";
import deleteAuthUserMW from "../middlewares/user/deleteAuthUserMW";
import sendUserDeletedResponseMW from "../middlewares/user/sendUserDeletedResponseMW";

const router = Router();

// Add auth MWs
router.use(authUserMW);

// Create user
router.post("/", validateCreateUserDataMW, createUserMW, returnUserMW);

// Get user
router.get("/:userId", validateUserIdMW, getUserMW, returnUserMW);

// Update user
router.put(
	"/:userId",
	validateUserIdMW,
	checkUserUpdateAccessMW,
	validateUpdateUserDataMW,
	updateUserMW,
	returnUserMW
);

// Delete user
router.delete(
	"/:userId",
	validateUserIdMW,
	checkDeleteUserAccessMW,
	deleteUserMW,
	deleteAuthUserMW,
	sendUserDeletedResponseMW
);

export { router as userRoute };
