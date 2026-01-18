import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  boolean,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const applicants = pgTable(
  "applicants",
  {
    id: serial("id").primaryKey(),

    email: varchar("email", { length: 255 }).notNull(),
    fullName: varchar("full_name", { length: 255 }).notNull(),

    experience: text("experience"),
    skill: text("skill"),

    isRegistered: boolean("is_registered").notNull().default(false),
    isActive: boolean("is_active").notNull().default(true),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

    createdBy: text("created_by").notNull(),
    updatedBy: text("updated_by").notNull(),
  },
  (table) => ({
    emailUnique: uniqueIndex("applicants_email_unique").on(table.email),
  })
);

// Type untuk membaca data (hasil SELECT)
export type Applicant = InferSelectModel<typeof applicants>;

// Type untuk memasukkan data (hasil INSERT)
// Ini berguna karena kolom seperti 'id' atau 'createdAt' opsional saat insert
export type NewApplicant = InferInsertModel<typeof applicants>;
