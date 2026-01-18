import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { vacancies } from "./vacancies";

export const vacancyPeriods = pgTable(
  "vacancy_periods",
  {
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
  },
  (table) => {
    return {
      // Indeks wajib untuk Foreign Key
      vacancyIdIdx: index("vp_vacancy_id_idx").on(table.vacancyId),

      // Indeks untuk pencarian rentang waktu
      dateRangeIdx: index("vp_date_range_idx").on(
        table.startDate,
        table.endDate
      ),

      // Indeks untuk filter status
      isActiveIdx: index("vp_is_active_idx").on(table.isActive),
    };
  }
);
