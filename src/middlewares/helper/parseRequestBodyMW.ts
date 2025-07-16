import { Request, Response, NextFunction } from "express";
import AppError from "../../classes/AppError";

export default function parseRequestBodyMW(req: Request, _: Response, next: NextFunction) {
	// Get data from request body
	const { data } = req.body as { data: unknown };

	try {
		// Validation
		if (data == undefined || typeof data !== "string") {
			throw new AppError({ message: "Invalid request.", status: 400 });
		}

		// Update request body with parsed JSON
		req.body = JSON.parse(data);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
