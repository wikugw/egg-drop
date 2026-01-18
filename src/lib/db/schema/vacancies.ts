import { InferSelectModel } from "drizzle-orm";
import {
  boolean,
  doublePrecision,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const vacancies = pgTable(
  "vacancies",
  {
    id: serial("id").primaryKey(),
    vacancyCode: varchar("vacancy_code", { length: 50 }).notNull().unique(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    requirements: text("requirements"),
    responsibilities: text("responsibilities"),

    departmentId: integer("department_id").notNull(),
    positionId: integer("position_id").notNull(),

    createdBy: text("created_by").notNull(),
    updatedBy: text("updated_by").notNull(),

    salaryMin: doublePrecision("salary_min").notNull(),
    salaryMax: doublePrecision("salary_max").notNull(),

    isActive: boolean("is_active").default(true).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      // Mempercepat pencarian berdasarkan departemen & posisi
      deptIdx: index("vac_dept_idx").on(table.departmentId),
      posIdx: index("vac_pos_idx").on(table.positionId),

      // Mempercepat filter lowongan yang masih aktif
      activeIdx: index("vac_active_idx").on(table.isActive),

      // Mempercepat pengurutan lowongan terbaru
      createdIdx: index("vac_created_idx").on(table.createdAt),
    };
  }
);

export type Vacancy = InferSelectModel<typeof vacancies>;
