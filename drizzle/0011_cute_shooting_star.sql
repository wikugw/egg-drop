ALTER TABLE "applicants" ADD COLUMN "full_name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "applicants" ADD COLUMN "created_by" text NOT NULL;--> statement-breakpoint
ALTER TABLE "applicants" ADD COLUMN "updated_by" text NOT NULL;--> statement-breakpoint
ALTER TABLE "applications" ADD COLUMN "status" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "applications" ADD COLUMN "created_by" text NOT NULL;--> statement-breakpoint
ALTER TABLE "applications" ADD COLUMN "updated_by" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "applicants_email_unique" ON "applicants" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "applications_email_vacancy_unique" ON "applications" USING btree ("email","vacancy_period_id");