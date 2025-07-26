import { z } from "zod/v4";
import { readingStatusOptions } from "../../../../constants/reading/readingStatusConstants";

export const readingStatusSchema = z.union(readingStatusOptions.map((status) => z.literal(status)));
