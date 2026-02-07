CREATE TABLE "product_category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(120) NOT NULL,
	CONSTRAINT "product_category_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "product_offer" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"supplier_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"code" varchar(64) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"image_url" text NOT NULL,
	"price" numeric(12, 2) NOT NULL,
	"width" real NOT NULL,
	"height" real NOT NULL,
	"depth" real NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "product_offer" ADD CONSTRAINT "product_offer_supplier_id_users_id_fk" FOREIGN KEY ("supplier_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_offer" ADD CONSTRAINT "product_offer_category_id_product_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."product_category"("id") ON DELETE restrict ON UPDATE no action;