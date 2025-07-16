import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import AppError from "../classes/AppError";

const imageUpload = multer({
	storage: multer.memoryStorage(),
	fileFilter: (_: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
		// Check mime type
		if (!file.mimetype.startsWith("image/")) {
			return cb(new AppError({ message: "The uploaded file is not an image.", status: 400 }));
		}

		cb(null, true);
	},
});

export { imageUpload };
