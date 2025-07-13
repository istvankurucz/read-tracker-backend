import { Router } from "express";
import authUserMW from "../middlewares/auth/authUserMW";
import returnUserMW from "../middlewares/user/returnUserMW";
import validateUserIdMW from "../middlewares/user/validateUserIdMW";
import getUserMW from "../middlewares/user/getUserMW";
import validateUpdateUserDataMW from "../middlewares/user/validateUpdateUserDataMW";
import updateUserMW from "../middlewares/user/updateUserMW";
import deleteAuthUserMW from "../middlewares/user/deleteAuthUserMW";
import sendUserDeletedResponseMW from "../middlewares/user/sendUserDeletedResponseMW";

const router = Router();

// Add auth MWs
router.use(authUserMW);

// User is added to DB automatically via Supabase trigger

// Get user
router.get("/:userId", validateUserIdMW, getUserMW, returnUserMW);

// Update user
router.put(
	"/:userId",
	validateUserIdMW,
	getUserMW,
	validateUpdateUserDataMW,
	updateUserMW,
	returnUserMW
);

// Delete user
router.delete("/:userId", validateUserIdMW, getUserMW, deleteAuthUserMW, sendUserDeletedResponseMW);

export { router as userRoute };
