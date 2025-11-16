import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const positions = pgTable("positions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
});
