import { User } from "@supabase/supabase-js";
import { Request, Response, NextFunction } from "express";
import validateCreateUserData from "../../utils/user/validation/validateCreateUserData";
import { CreateUserData } from "../../utils/user/validation/schemas/createUserSchema";

export default function validateCreateUserDataMW(_: Request, res: Response, next: NextFunction) {
	// Get auth user from res.locals
	const {
		authUser: { id, user_metadata },
	} = res.locals as { authUser: User };

	try {
		// Validation
		const userData = validateCreateUserData({
			id,
			name: user_metadata.full_name,
		});

		// Add user data to res.locals
		(res.locals.userData as CreateUserData) = userData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
