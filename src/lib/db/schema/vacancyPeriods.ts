import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { vacancies } from "./vacancies";

export const vacancyPeriods = pgTable("vacancy_periods", {
  id: serial("id").primaryKey(),

  vacancyId: integer("vacancy_id")
    .notNull()
    .references(() => vacancies.id, { onDelete: "cascade" }),

  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),

  isActive: boolean("is_active").notNull().default(true),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  createdBy: text("created_by").notNull(),
  updatedBy: text("updated_by").notNull(),
});
