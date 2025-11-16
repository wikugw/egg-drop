import { db } from "@/src/lib/db";
import { employees } from "@/src/lib/db/schema/employees";

export const seedEmployees = async () => {
  await db
    .insert(employees)
    .values({
      id: 1,
      userId: 1,
      employeeId: "EMP-001",
      departmentId: 1,
      positionId: 1,
      isActive: true,
    })
    .onConflictDoNothing();
};
