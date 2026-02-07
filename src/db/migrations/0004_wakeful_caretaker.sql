CREATE TABLE "container_offer" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"container_id" uuid NOT NULL,
	"offer_id" uuid NOT NULL,
	"quantity" integer NOT NULL,
	"unit_price_at_time" numeric(12, 2) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "container" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"importer_id" uuid NOT NULL,
	"label" varchar(128),
	"max_width" real NOT NULL,
	"max_height" real NOT NULL,
	"max_depth" real NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "container_offer" ADD CONSTRAINT "container_offer_container_id_container_id_fk" FOREIGN KEY ("container_id") REFERENCES "public"."container"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "container_offer" ADD CONSTRAINT "container_offer_offer_id_product_offer_id_fk" FOREIGN KEY ("offer_id") REFERENCES "public"."product_offer"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "container" ADD CONSTRAINT "container_importer_id_users_id_fk" FOREIGN KEY ("importer_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "uq_container_offer" ON "container_offer" USING btree ("container_id","offer_id");