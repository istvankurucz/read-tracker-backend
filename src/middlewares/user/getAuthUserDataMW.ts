import { User } from "@supabase/supabase-js";
import { Request, Response, NextFunction } from "express";
import getUser from "../../services/user/getUser";
import { UserSelect } from "../../types/userTypes";

export default async function getAuthUserDataMW(_: Request, res: Response, next: NextFunction) {
	// Get auth user
	const { authUser } = res.locals as { authUser: User };

	try {
		// Get user
		const user = await getUser(authUser.id);

		// Add user to res.locals
		(res.locals.user as UserSelect) = user;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
