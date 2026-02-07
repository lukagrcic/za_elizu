CREATE TYPE "public"."user_role" AS ENUM('ADMIN', 'IMPORTER', 'SUPPLIER');--> statement-breakpoint
CREATE TABLE "importer_profiles" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"company_name" varchar(120) NOT NULL,
	"tax_id" varchar(30) NOT NULL,
	"phone" varchar(30) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "supplier_profiles" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"company_name" varchar(120) NOT NULL,
	"tax_id" varchar(30) NOT NULL,
	"address" varchar(200) NOT NULL,
	"phone" varchar(30) NOT NULL,
	"country" varchar(80) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(50) NOT NULL,
	"email" varchar(255) NOT NULL,
	"pass_hash" text NOT NULL,
	"role" "user_role" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "importer_profiles" ADD CONSTRAINT "importer_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "supplier_profiles" ADD CONSTRAINT "supplier_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;