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
import getUserCurrentlyReadingListMW from "../middlewares/list/getUserCurrentlyReadingListMW";
import getUserReadingsMW from "../middlewares/reading/getUserReadingsMW";
import getLatestUserReadingsMW from "../middlewares/reading/getLatestUserReadingsMW";
import returnReadingsMW from "../middlewares/reading/returnReadingsMW";
import deleteUserBooksMW from "../middlewares/userBook/deleteUserBooksMW";
import deleteUserReadingsMW from "../middlewares/reading/deleteUserReadingsMW";
import deleteUserListsMW from "../middlewares/list/deleteUserListsMW";
import deleteUserGoalsMW from "../middlewares/goal/deleteUserGoalsMW";

const router = Router();

// Add auth MWs
router.use(authUserMW);

// User is added to DB automatically via Supabase trigger

// Get user
router.get("/:userId", validateUserIdMW, getUserMW, returnUserMW);

// Get latest readings
router.get(
	"/:userId/latest-readings",
	validateUserIdMW,
	getUserMW,
	getUserReadingsMW,
	getUserCurrentlyReadingListMW,
	getLatestUserReadingsMW,
	returnReadingsMW
);

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
router.delete(
	"/:userId",
	validateUserIdMW,
	getUserMW,
	deleteAuthUserMW,
	// delete friendships?
	deleteUserBooksMW,
	deleteUserReadingsMW,
	deleteUserListsMW,
	deleteUserGoalsMW,
	sendUserDeletedResponseMW
);

export { router as userRoute };
