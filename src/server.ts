import "dotenv/config";
import express from "express";
import cors from "cors";
import { userRoute } from "./routes/userRoute";
import { friendshipRote } from "./routes/friendshipRoute";
import { bookRoute } from "./routes/bookRoute";
import { authorRoute } from "./routes/authorRoute";
import { userBookRoute } from "./routes/userBookRoute";
import { reviewRoute } from "./routes/reviewRoute";
import { listRoute } from "./routes/listRoute";
import { listBookRoute } from "./routes/listBookRoute";
import handleErrorMW from "./middlewares/error/handleErrorMW";

// Create app instance
const app = express();

// Middlewares
app.use(cors({ origin: process.env.CLIENT_URL! }));
app.use(express.json());

// Routes
app.use("/api/users", userRoute);
app.use("/api/users/:userId/friendships", friendshipRote);
app.use("/api/books", bookRoute);
app.use("/api/authors", authorRoute);
app.use("/api/users/:userId/books", userBookRoute);
// app.use("/api/books/:bookId/readings", readingRoute)
app.use("/api/books/:bookId/reviews", reviewRoute);
app.use("/api/users/:userId/lists", listRoute);
app.use("/api/lists/:listId/books", listBookRoute);

// Error handler
app.use(handleErrorMW);

// Listener
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on port", port));
