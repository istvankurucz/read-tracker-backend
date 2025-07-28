import { Router } from "express";
import authUserMW from "../middlewares/auth/authUserMW";
import getAuthUserDataMW from "../middlewares/user/getAuthUserDataMW";
import validateCreateGoalDataMW from "../middlewares/goal/validateCreateGoalDataMW";
import createGoalMW from "../middlewares/goal/createGoalMW";
import returnGoalMW from "../middlewares/goal/returnGoalMW";
import getUserGoalsMW from "../middlewares/goal/getUserGoalsMW";
import returnGoalsMW from "../middlewares/goal/returnGoalsMW";
import validateGoalIdMW from "../middlewares/goal/validateGoalIdMW";
import getGoalMW from "../middlewares/goal/getGoalMW";

const router = Router({ mergeParams: true });

// Add MWs
router.use(authUserMW, getAuthUserDataMW);

// Create goal
router.post("/", validateCreateGoalDataMW, createGoalMW, returnGoalMW);

// Get goal
router.get("/:goalId", validateGoalIdMW, getGoalMW, returnGoalMW);

// Get user goals
router.get("/", getUserGoalsMW, returnGoalsMW);

// Update goal
router.put(
	"/:goalId",
	validateGoalIdMW,
	getGoalMW, //
	// validate goal data
	// update goal
	returnGoalMW
);

// Delete goal

export { router as goalRoute };
