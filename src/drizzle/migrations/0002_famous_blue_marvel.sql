ALTER TABLE "friendship" RENAME COLUMN "adressee_id" TO "addressee_id";--> statement-breakpoint
ALTER TABLE "friendship" DROP CONSTRAINT "unique_friendship_pair";--> statement-breakpoint
ALTER TABLE "friendship" DROP CONSTRAINT "friendship_adressee_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "friendship" DROP CONSTRAINT "friendship_requester_id_adressee_id_pk";--> statement-breakpoint
ALTER TABLE "friendship" ADD CONSTRAINT "friendship_requester_id_addressee_id_pk" PRIMARY KEY("requester_id","addressee_id");--> statement-breakpoint
ALTER TABLE "friendship" ADD CONSTRAINT "friendship_addressee_id_user_id_fk" FOREIGN KEY ("addressee_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "friendship" ADD CONSTRAINT "unique_friendship_pair" UNIQUE("requester_id","addressee_id");