import { User } from "@supabase/supabase-js";
import { Request, Response, NextFunction } from "express";
import validateCreateUserData from "../../utils/user/validation/validateCreateUserData";
import { CreateUserData } from "../../utils/user/validation/schemas/createUserSchema";

export default function validateCreateUserDataMW(req: Request, res: Response, next: NextFunction) {
	// Get auth user from res.locals
	// const { authUser } = res.locals as { authUser: User };
	// const { id, email, user_metadata } = authUser;

	try {
		// Validation
		// const userData = validateCreateUserData({
		// 	id,
		// 	name: user_metadata.full_name,
		// });
		const userData = validateCreateUserData(req.body);

		// Add user data to res.locals
		(res.locals.userData as CreateUserData) = userData;

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
