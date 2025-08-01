import { User as AuthUser } from "@supabase/supabase-js";
import { Request, Response, NextFunction } from "express";
import getUser from "../../services/user/getUser";
import { User } from "../../types/userTypes";

export default async function getAuthUserDataMW(_: Request, res: Response, next: NextFunction) {
	// Get auth user
	const { authUser } = res.locals as { authUser: AuthUser };

	try {
		// Get user
		const user = await getUser(authUser.id);

		// Add user to res.locals
		(res.locals.user as User) = user;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
