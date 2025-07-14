import { Router } from "express";
import authUserMW from "../middlewares/auth/authUserMW";
import getUserMW from "../middlewares/user/getUserMW";
import validateBookSearchDataMW from "../middlewares/book/validateBookSearchDataMW";

const router = Router();

// Add MWs
router.use(authUserMW, getUserMW);

// Search books
router.get("/search", validateBookSearchDataMW);

export { router as bookRoute };
