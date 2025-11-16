import { db } from "@/src/lib/db";
import { departments } from "@/src/lib/db/schema/departments";

export const seedDepartments = async () => {
  await db
    .insert(departments)
    .values({
      id: 1,
      name: "General Department",
    })
    .onConflictDoNothing();
};
