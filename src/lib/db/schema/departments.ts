import { InferSelectModel } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const departments = pgTable("departments", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
});

export type Department = InferSelectModel<typeof departments>;
