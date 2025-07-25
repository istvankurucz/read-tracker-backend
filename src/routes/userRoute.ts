import { Router } from "express";
import authUserMW from "../middlewares/auth/authUserMW";
import returnUserMW from "../middlewares/user/returnUserMW";
import validateUserIdMW from "../middlewares/user/validateUserIdMW";
import getUserMW from "../middlewares/user/getUserMW";
import validateUpdateUserDataMW from "../middlewares/user/validateUpdateUserDataMW";
import updateUserMW from "../middlewares/user/updateUserMW";
import deleteAuthUserMW from "../middlewares/user/deleteAuthUserMW";
import sendUserDeletedResponseMW from "../middlewares/user/sendUserDeletedResponseMW";
import getUserReviewsMW from "../middlewares/review/getUserReviewsMW";
import returnReviewsMW from "../middlewares/review/returnReviewsMW";

const router = Router();

// Add auth MWs
router.use(authUserMW);

// User is added to DB automatically via Supabase trigger

// Get user
router.get("/:userId", validateUserIdMW, getUserMW, returnUserMW);

// Get user reviews
router.get("/:userId/reviews", validateUserIdMW, getUserMW, getUserReviewsMW, returnReviewsMW);

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
