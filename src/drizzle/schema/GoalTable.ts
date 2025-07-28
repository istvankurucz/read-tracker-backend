import { check, integer, pgEnum, pgTable, unique, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { goalTypeOptions } from "../../constants/goals/goalConstants";
import { UserTable } from "./UserTable";
import { relations, sql } from "drizzle-orm";

// Enums
export const goalTypeEnum = pgEnum("goal_type", goalTypeOptions);

// Schema
export const GoalTable = pgTable(
	"goal",
	{
		id,
		target: integer("target").notNull(),
		type: goalTypeEnum("goal").notNull().default("yearly"),
		year: integer("year").notNull().default(new Date().getFullYear()),
		month: integer("month"),
		week: integer("week"),
		userId: uuid("user_id")
			.notNull()
			.references(() => UserTable.id, { onDelete: "cascade" }),
		updatedAt,
		createdAt,
	},
	(goal) => [
		check("goal_positive", sql`${goal.target} > 0`),
		check("year_positive", sql`${goal.year} > 0`),
		check("month_positive", sql`${goal.month} IS NULL OR ${goal.month} > 0`),
		check("week_positive", sql`${goal.week} IS NULL OR ${goal.week} > 0`),
		unique("unique_goal_date").on(goal.year, goal.month, goal.week),
	]
);

// Relations
export const GoalTableRelations = relations(GoalTable, ({ one }) => {
	return {
		user: one(UserTable, {
			fields: [GoalTable.userId],
			references: [UserTable.id],
		}),
	};
});
