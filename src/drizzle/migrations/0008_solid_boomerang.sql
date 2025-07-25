ALTER TABLE "rating" RENAME TO "review";--> statement-breakpoint
ALTER TABLE "review" DROP CONSTRAINT "rating_correct_value";--> statement-breakpoint
ALTER TABLE "review" DROP CONSTRAINT "comment_min_length";--> statement-breakpoint
ALTER TABLE "review" DROP CONSTRAINT "rating_book_id_book_id_fk";
--> statement-breakpoint
ALTER TABLE "review" DROP CONSTRAINT "rating_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_book_id_book_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."book"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_correct_value" CHECK ("review"."rating" BETWEEN 1 and 5);--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "comment_min_length" CHECK ("review"."comment" IS NULL OR char_length("review"."comment") > 0);