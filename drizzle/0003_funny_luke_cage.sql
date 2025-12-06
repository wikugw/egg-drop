CREATE TABLE "vacancies" (
	"id" serial PRIMARY KEY NOT NULL,
	"vacancy_code" varchar(50) NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"requirements" text,
	"responsibilities" text,
	"department_id" integer NOT NULL,
	"position_id" integer NOT NULL,
	"created_by" integer NOT NULL,
	"updated_by" integer NOT NULL,
	"salary_min" double precision NOT NULL,
	"salary_max" double precision NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "vacancies_vacancy_code_unique" UNIQUE("vacancy_code")
);
--> statement-breakpoint
CREATE TABLE "vacancy_periods" (
	"id" serial PRIMARY KEY NOT NULL,
	"vacancy_id" integer NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "vacancy_periods" ADD CONSTRAINT "vacancy_periods_vacancy_id_vacancies_id_fk" FOREIGN KEY ("vacancy_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;