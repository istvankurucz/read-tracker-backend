ALTER TABLE "goal" DROP CONSTRAINT "month_positive";--> statement-breakpoint
ALTER TABLE "goal" DROP CONSTRAINT "week_positive";--> statement-breakpoint
ALTER TABLE "goal" ADD CONSTRAINT "month_nonnegative" CHECK ("goal"."month" IS NULL OR "goal"."month" >= 0);--> statement-breakpoint
ALTER TABLE "goal" ADD CONSTRAINT "week_nonnegative" CHECK ("goal"."week" IS NULL OR "goal"."week" >= 0);