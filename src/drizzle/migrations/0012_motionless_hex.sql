ALTER TABLE "reading" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."reading_status";--> statement-breakpoint
CREATE TYPE "public"."reading_status" AS ENUM('in progress', 'finished');--> statement-breakpoint
ALTER TABLE "reading" ALTER COLUMN "status" SET DATA TYPE "public"."reading_status" USING "status"::"public"."reading_status";