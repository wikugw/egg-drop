CREATE TABLE "applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"expoerience" text,
	"skill" text,
	"vacancy_period_id" integer NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "applications_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_vacancy_period_id_vacancy_periods_id_fk" FOREIGN KEY ("vacancy_period_id") REFERENCES "public"."vacancy_periods"("id") ON DELETE cascade ON UPDATE no action;