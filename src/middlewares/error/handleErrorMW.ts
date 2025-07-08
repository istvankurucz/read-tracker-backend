import { NextFunction, Request, Response } from "express";
import AppError from "../../classes/AppError";
import { PostgresError } from "postgres";
import ValidationError from "../../classes/ValidationError";

export default function handleErrorMW(
	error: unknown,
	_: Request,
	res: Response,
	next: NextFunction
) {
	console.log("Error:\n", error);

	// Check if the response was already sent
	if (res.headersSent) return next(error);

	// Postgres error
	if (error instanceof PostgresError) {
		res.status(500).json({
			message: "Database error.",
			details: error.message,
		});
		return;
	}

	// Validation error
	if (error instanceof ValidationError) {
		res.status(400).json(error.erros);
		return;
	}

	// App error
	if (error instanceof AppError) {
		res.status(error.status).json({
			message: error.message,
			details: error.details,
		});
		return;
	}

	// Default error
	res.status(500).json({ message: "Unknown error happened." });
}
