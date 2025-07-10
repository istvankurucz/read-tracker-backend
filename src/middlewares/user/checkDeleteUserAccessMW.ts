import { User } from "@supabase/supabase-js";
import { Request, Response, NextFunction } from "express";
import AppError from "../../classes/AppError";

export default function checkDeleteUserAccessMW(req: Request, res: Response, next: NextFunction) {
	// Get auth user and user ID
	const { authUser } = res.locals as { authUser: User };
	const { userId } = req.params as { userId: string };

	try {
		// Check acccess
		if (userId !== authUser.id) {
			throw new AppError({ message: "Access denied.", status: 403 });
		}

		// Go to next MW
		return next();
	} catch (err) {
		return next(err);
	}
}
