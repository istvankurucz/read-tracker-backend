ALTER TABLE "friendship" RENAME COLUMN "user1_id" TO "requester_id";--> statement-breakpoint
ALTER TABLE "friendship" RENAME COLUMN "user2_id" TO "adressee_id";--> statement-breakpoint
-- ALTER TABLE "friendship" DROP CONSTRAINT "unique_friendship_pair";--> statement-breakpoint
ALTER TABLE "friendship" DROP CONSTRAINT "user_id_order";--> statement-breakpoint
ALTER TABLE "friendship" DROP CONSTRAINT "friendship_user1_id_user_id_fk";--> statement-breakpoint
ALTER TABLE "friendship" DROP CONSTRAINT "friendship_user2_id_user_id_fk";--> statement-breakpoint
ALTER TABLE "friendship" DROP CONSTRAINT "friendship_user1_id_user2_id_pk";--> statement-breakpoint

ALTER TABLE "friendship" ADD CONSTRAINT "friendship_requester_id_adressee_id_pk" PRIMARY KEY("requester_id","adressee_id");--> statement-breakpoint
ALTER TABLE "friendship" ADD CONSTRAINT "friendship_requester_id_user_id_fk" FOREIGN KEY ("requester_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "friendship" ADD CONSTRAINT "friendship_adressee_id_user_id_fk" FOREIGN KEY ("adressee_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "friendship" ADD CONSTRAINT "unique_friendship_pair" UNIQUE("requester_id","adressee_id");