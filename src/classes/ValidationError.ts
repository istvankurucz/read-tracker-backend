import { type ZodError } from "zod/v4";
import { type ValidationError as ValidationErrorType } from "../types/errorTypes";
import formatZodError from "../utils/error/formatZodError";

export default class ValidationError extends Error {
	erros: ValidationErrorType[];

	constructor(error: ZodError) {
		super("Validation error.");
		this.name = this.constructor.name;
		this.erros = formatZodError(error);

		// Fixing prototype chain
		Object.setPrototypeOf(this, new.target.prototype);
		Error.captureStackTrace(this);
	}
}
