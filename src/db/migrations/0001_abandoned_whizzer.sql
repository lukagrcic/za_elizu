ALTER TABLE "importer_profiles" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "supplier_profiles" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "importer_profiles" CASCADE;--> statement-breakpoint
DROP TABLE "supplier_profiles" CASCADE;--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_username_unique";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "company_name" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "country" varchar(100);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "address" text;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "username";