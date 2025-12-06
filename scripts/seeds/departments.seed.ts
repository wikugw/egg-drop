import { db } from "@/src/lib/db";
import { departments } from "@/src/lib/db/schema/departments";

// The full list of departments
const departmentItems = [
  { value: "1", label: "General Department" },
  { value: "2", label: "Finance" },
  { value: "3", label: "Human Resources (HR)" },
  { value: "4", label: "Marketing" },
  { value: "5", label: "Sales" },
  { value: "6", label: "Engineering" },
  { value: "7", label: "Research & Development (R&D)" },
];

export const seedDepartments = async () => {
  // 1. Map the frontend array into an array of objects that matches the database schema.
  // We assume your 'departments' table has 'id' (number) and 'name' (string) columns.
  const departmentsToInsert = departmentItems.map((item) => ({
    // Using parseInt() assuming 'id' in your database is a number.
    // If it's a string, use 'item.value' directly.
    id: parseInt(item.value),
    name: item.label,
  }));

  // 2. Perform the efficient batch insertion using Drizzle's .values()
  await db
    .insert(departments)
    .values(departmentsToInsert)
    // Ensures the seed script is safe to run multiple times without duplicating data
    .onConflictDoNothing();

  console.log(
    `✅ Seeded ${departmentsToInsert.length} departments into the database.`
  );
};
