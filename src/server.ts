import "dotenv/config";
import express from "express";
import cors from "cors";

// Create app instance
const app = express();

// Middlewares
app.use(cors({ origin: process.env.CLIENT_URL! }));
app.use(express.json());

// Routes

// Error handler

// Listener
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on port", port));
