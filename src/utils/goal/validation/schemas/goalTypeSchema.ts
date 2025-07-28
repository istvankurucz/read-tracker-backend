import { z } from "zod/v4";
import { goalTypeOptions } from "../../../../constants/goals/goalConstants";

export const goalTypeSchema = z.union(goalTypeOptions.map((type) => z.literal(type)));
