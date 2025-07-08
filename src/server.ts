import "dotenv/config";
import express from "express";
import cors from "cors";
import { userRoute } from "./routes/userRoute";
import handleErrorMW from "./middlewares/error/handleErrorMW";

// Create app instance
const app = express();

// Middlewares
app.use(cors({ origin: process.env.CLIENT_URL! }));
app.use(express.json());

// Routes
app.use("/api/users", userRoute);

// Error handler
app.use(handleErrorMW);

// Listener
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on port", port));
