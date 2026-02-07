CREATE TABLE "collaborations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"importer_id" uuid NOT NULL,
	"supplier_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "collaborations_importer_supplier_unique" UNIQUE("importer_id","supplier_id")
);
--> statement-breakpoint
ALTER TABLE "collaborations" ADD CONSTRAINT "collaborations_importer_id_users_id_fk" FOREIGN KEY ("importer_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collaborations" ADD CONSTRAINT "collaborations_supplier_id_users_id_fk" FOREIGN KEY ("supplier_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;