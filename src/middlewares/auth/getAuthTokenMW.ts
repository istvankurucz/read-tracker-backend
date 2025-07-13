import { Request, Response, NextFunction } from "express";
import validateAuthToken from "../../utils/auth/validateAuthToken";

export default function getAuthTokenMW(req: Request, res: Response, next: NextFunction) {
	// Get authorization header from request header
	const { authorization } = req.headers as { authorization: string };

	// Get token from authorization header
	const token = authorization.split(" ")[1];

	try {
		// Validate token
		const validatedToken = validateAuthToken(token);

		// Add token to res.locals
		(res.locals.authToken as string) = validatedToken;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
