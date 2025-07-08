import { Router } from "express";
import authUserMW from "../middlewares/auth/auth/authUserMW";
import validateCreateUserDataMW from "../middlewares/user/validateCreateUserDataMW";
import createUserMW from "../middlewares/user/createUserMW";
import returnUserMW from "../middlewares/user/returnUserMW";
import validateUserIdMW from "../middlewares/user/validateUserIdMW";
import getUserMW from "../middlewares/user/getUserMW";

const router = Router();

// Add auth MWs
router.use(authUserMW);

// Create user
router.post("/", validateCreateUserDataMW, createUserMW, returnUserMW);

// Get user
router.get("/:userId", validateUserIdMW, getUserMW, returnUserMW);

export { router as userRoute };
