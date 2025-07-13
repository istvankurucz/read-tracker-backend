import { Request, Response, NextFunction } from "express";
import { User } from "@supabase/supabase-js";
import getAuthUser from "../../services/auth/getAuthUser";

export default async function getUserFromAuthMW(_: Request, res: Response, next: NextFunction) {
	// Get auth token from res.locals
	const { authToken } = res.locals as { authToken: string };

	try {
		// Get user based on auth token
		const user = await getAuthUser(authToken);

		// Add auth user to res.locals
		(res.locals.authUser as User) = user;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
