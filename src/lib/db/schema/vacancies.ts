import { InferSelectModel } from "drizzle-orm";
import {
  boolean,
  doublePrecision,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const vacancies = pgTable("vacancies", {
  id: serial("id").primaryKey(),
  vacancyCode: varchar("vacancy_code", { length: 50 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  requirements: text("requirements"),
  responsibilities: text("responsibilities"),

  departmentId: integer("department_id").notNull(),
  positionId: integer("position_id").notNull(),

  createdBy: integer("created_by").notNull(),
  updatedBy: integer("updated_by").notNull(),

  salaryMin: doublePrecision("salary_min").notNull(),
  salaryMax: doublePrecision("salary_max").notNull(),

  isActive: boolean("is_active").default(true).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Vacancy = InferSelectModel<typeof vacancies>;
