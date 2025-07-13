import { Request, Response, NextFunction } from "express";
import validateAuthorizationHeader from "../../utils/auth/validateAuthorizationHeader";

export default function validateAuthorizationHeaderMW(
	req: Request,
	_: Response,
	next: NextFunction
) {
	// Get authorization header from request header
	const { authorization } = req.headers;

	try {
		// Validate authorization header
		validateAuthorizationHeader(authorization);

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
