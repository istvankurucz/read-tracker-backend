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
import validateUpdateGoalDataMW from "../middlewares/goal/validateUpdateGoalDataMW";
import updateGoalMW from "../middlewares/goal/updateGoalMW";
import deleteGoalMW from "../middlewares/goal/deleteGoalMW";
import sendGoalDeletedResponseMW from "../middlewares/goal/sendGoalDeletedResponseMW";
import getGoalDataMW from "../middlewares/goal/getGoalDataMW";
import checkUpdateGoalAccessMW from "../middlewares/goal/checkUpdateGoalAccessMW";

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
	getGoalDataMW,
	checkUpdateGoalAccessMW,
	validateUpdateGoalDataMW,
	updateGoalMW,
	returnGoalMW
);

// Delete goal
router.delete("/:goalId", validateGoalIdMW, getGoalDataMW, deleteGoalMW, sendGoalDeletedResponseMW);

export { router as goalRoute };
