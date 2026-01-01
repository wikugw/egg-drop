ALTER TABLE "vacancy_periods" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "vacancy_periods" ADD COLUMN "created_by" text NOT NULL;--> statement-breakpoint
ALTER TABLE "vacancy_periods" ADD COLUMN "updated_by" text NOT NULL;