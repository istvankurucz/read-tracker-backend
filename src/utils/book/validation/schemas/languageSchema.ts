import { z } from "zod/v4";
import { languageCodeOptions } from "../../../../constants/book/languageConstants";

export const languageSchema = z.union(
	languageCodeOptions.map((code) => z.literal(code)),
	"Invalid language."
);
