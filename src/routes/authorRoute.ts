import { Router } from "express";
import authUserMW from "../middlewares/auth/authUserMW";
import validateAuthorSearchDataMW from "../middlewares/author/validateAuthorSearchDataMW";
import searchAuthorsMW from "../middlewares/author/searchAuthorsMW";
import returnAuthorsMW from "../middlewares/author/returnAuthorsMW";
import validateCreateAuthorDataMW from "../middlewares/author/validateCreateAuthorDataMW";
import createAuthorMW from "../middlewares/author/createAuthorMW";
import returnAuthorMW from "../middlewares/author/returnAuthorMW";

const router = Router();

// Add MWs
router.use(authUserMW);

// Create author
router.post("/", validateCreateAuthorDataMW, createAuthorMW, returnAuthorMW);

// Search author
router.get("/search", validateAuthorSearchDataMW, searchAuthorsMW, returnAuthorsMW);

export { router as authorRoute };
