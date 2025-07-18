import { Router } from "express";
import authUserMW from "../middlewares/auth/authUserMW";
import validateAuthorSearchDataMW from "../middlewares/author/validateAuthorSearchDataMW";
import searchAuthorsMW from "../middlewares/author/searchAuthorsMW";
import returnAuthorsMW from "../middlewares/author/returnAuthorsMW";
import getUserAuthorsMW from "../middlewares/author/getUserAuthorsMW";

const router = Router();

// Add MWs
router.use(authUserMW);

// Search author
router.get("/search", validateAuthorSearchDataMW, searchAuthorsMW, returnAuthorsMW);

// Get user authors
router.get("/user", getUserAuthorsMW, returnAuthorsMW);

export { router as authorRoute };
