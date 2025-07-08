CREATE TYPE "public"."friendship_status" AS ENUM('pending', 'accepted', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."goal_type" AS ENUM('yearly', 'monthly', 'weekly');--> statement-breakpoint
CREATE TYPE "public"."reading_status" AS ENUM('not started', 'in progress', 'finished', 'not finished');--> statement-breakpoint
CREATE TABLE "author" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "name_min_length" CHECK (char_length("author"."name") > 0)
);
--> statement-breakpoint
CREATE TABLE "book_author" (
	"book_id" uuid NOT NULL,
	"author_id" uuid NOT NULL,
	CONSTRAINT "book_author_book_id_author_id_pk" PRIMARY KEY("book_id","author_id")
);
--> statement-breakpoint
CREATE TABLE "book" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"subtitle" text,
	"cover_url" text NOT NULL,
	"pages" integer NOT NULL,
	"genre" text,
	"description" text,
	"release_date" timestamp,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "title_min_length" CHECK (char_length("book"."title") > 0),
	CONSTRAINT "subtitle_min_length" CHECK ("book"."subtitle" IS NULL OR char_length("book"."subtitle") > 0),
	CONSTRAINT "cover_url_min_length" CHECK (char_length("book"."cover_url") > 0),
	CONSTRAINT "pages_positive" CHECK ("book"."pages" > 0),
	CONSTRAINT "release_date_not_future" CHECK ("book"."release_date" IS NULL OR "book"."release_date" <= now())
);
--> statement-breakpoint
CREATE TABLE "friendship" (
	"user1_id" uuid NOT NULL,
	"user2_id" uuid NOT NULL,
	"status" "friendship_status" DEFAULT 'pending' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "friendship_user1_id_user2_id_pk" PRIMARY KEY("user1_id","user2_id"),
	CONSTRAINT "unique_friendship_pair" UNIQUE("user1_id","user2_id"),
	CONSTRAINT "user_id_order" CHECK ("friendship"."user1_id" < "friendship"."user2_id")
);
--> statement-breakpoint
CREATE TABLE "goal" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"target" integer NOT NULL,
	"goal" "goal_type" DEFAULT 'yearly' NOT NULL,
	"year" integer DEFAULT 2025 NOT NULL,
	"month" integer,
	"week" integer,
	"user_id" uuid NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "goal_positive" CHECK ("goal"."target" > 0),
	CONSTRAINT "year_positive" CHECK ("goal"."year" > 0),
	CONSTRAINT "month_positive" CHECK ("goal"."month" IS NULL OR "goal"."month" > 0),
	CONSTRAINT "week_positive" CHECK ("goal"."week" IS NULL OR "goal"."week" > 0)
);
--> statement-breakpoint
CREATE TABLE "list_book" (
	"list_id" uuid NOT NULL,
	"book_id" uuid NOT NULL,
	"added_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "list_book_list_id_book_id_pk" PRIMARY KEY("list_id","book_id"),
	CONSTRAINT "added_at_date_not_future" CHECK ("list_book"."added_at" <= now())
);
--> statement-breakpoint
CREATE TABLE "list" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"public" boolean DEFAULT true NOT NULL,
	"system" boolean DEFAULT false NOT NULL,
	"user_id" uuid NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rating" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"rating" real NOT NULL,
	"finished_book" boolean DEFAULT true NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"comment" text,
	"book_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	CONSTRAINT "rating_correct_value" CHECK ("rating"."rating" BETWEEN 1 and 5),
	CONSTRAINT "comment_min_length" CHECK ("rating"."comment" IS NULL OR char_length("rating"."comment") > 0)
);
--> statement-breakpoint
CREATE TABLE "reading_snapshot" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"page" integer NOT NULL,
	"time" integer,
	"reading_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reading" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"status" "reading_status" DEFAULT 'not started' NOT NULL,
	"pages" integer,
	"started_at" timestamp,
	"finished_at" timestamp,
	"book_id" uuid NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_book" (
	"user_id" uuid NOT NULL,
	"book_id" uuid NOT NULL,
	"added_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_book_book_id_user_id_pk" PRIMARY KEY("book_id","user_id"),
	CONSTRAINT "added_at_date_not_future" CHECK ("user_book"."added_at" <= now())
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "name_min_length" CHECK (char_length("user"."name") > 0)
);
--> statement-breakpoint
ALTER TABLE "book_author" ADD CONSTRAINT "book_author_book_id_book_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."book"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "book_author" ADD CONSTRAINT "book_author_author_id_author_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."author"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "friendship" ADD CONSTRAINT "friendship_user1_id_user_id_fk" FOREIGN KEY ("user1_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "friendship" ADD CONSTRAINT "friendship_user2_id_user_id_fk" FOREIGN KEY ("user2_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "goal" ADD CONSTRAINT "goal_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "list_book" ADD CONSTRAINT "list_book_list_id_list_id_fk" FOREIGN KEY ("list_id") REFERENCES "public"."list"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "list_book" ADD CONSTRAINT "list_book_book_id_book_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."book"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "list" ADD CONSTRAINT "list_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rating" ADD CONSTRAINT "rating_book_id_book_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."book"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rating" ADD CONSTRAINT "rating_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reading_snapshot" ADD CONSTRAINT "reading_snapshot_reading_id_reading_id_fk" FOREIGN KEY ("reading_id") REFERENCES "public"."reading"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reading" ADD CONSTRAINT "reading_book_id_book_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."book"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reading" ADD CONSTRAINT "reading_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_book" ADD CONSTRAINT "user_book_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_book" ADD CONSTRAINT "user_book_book_id_book_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."book"("id") ON DELETE cascade ON UPDATE no action;