import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { departments } from "./departments";
import { positions } from "./positions";
import { users } from "./users";

export const employees = pgTable(
  "employees",
  {
    id: serial("id").primaryKey(),

    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    employeeId: varchar("employee_id", { length: 50 }).notNull().unique(),

    // Updated: number references instead of strings
    departmentId: integer("department_id")
      .notNull()
      .references(() => departments.id, { onDelete: "cascade" }),
    positionId: integer("position_id")
      .notNull()
      .references(() => positions.id, { onDelete: "cascade" }),

    // NEW: isActive
    isActive: boolean("is_active").notNull().default(true),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      // Menambahkan indeks untuk Foreign Keys
      userIdIdx: index("user_id_idx").on(table.userId),
      deptIdIdx: index("dept_id_idx").on(table.departmentId),
      posIdIdx: index("pos_id_idx").on(table.positionId),
      // Opsional: Indeks untuk pencarian status aktif
      isActiveIdx: index("is_active_idx").on(table.isActive),
    };
  }
);
