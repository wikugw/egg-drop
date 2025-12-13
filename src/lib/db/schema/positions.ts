import { InferSelectModel } from "drizzle-orm";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { departments } from "./departments";

export const positions = pgTable("positions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  departmentId: integer("department_id")
    .references(() => departments.id) // Links to the 'id' column in the 'departments' table
    .notNull(),
});

export type Position = InferSelectModel<typeof positions>;
