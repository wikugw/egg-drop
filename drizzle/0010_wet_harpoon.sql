CREATE TABLE "applicants" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"experience" text,
	"skill" text,
	"is_registered" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "applications" DROP COLUMN "experience";--> statement-breakpoint
ALTER TABLE "applications" DROP COLUMN "skill";