import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { vacancyPeriods } from "./vacancyPeriods";

export const applications = pgTable(
  "applications",
  {
    id: serial("id").primaryKey(),

    email: varchar("email", { length: 255 }).notNull(),
    status: varchar("status", { length: 100 }).notNull(),

    vacancyperiodId: integer("vacancy_period_id")
      .notNull()
      .references(() => vacancyPeriods.id, { onDelete: "cascade" }),

    // NEW: isActive
    isActive: boolean("is_active").notNull().default(true),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

    createdBy: text("created_by").notNull(),
    updatedBy: text("updated_by").notNull(),
  },
  (table) => ({
    emailVacancyUnique: uniqueIndex("applications_email_vacancy_unique").on(
      table.email,
      table.vacancyperiodId
    ),
  })
);
