import { db } from "@/src/lib/db";
import { positions } from "@/src/lib/db/schema/positions";

export const seedPositions = async () => {
  const positionItems = [
    // --- Department 1: General Department ---
    { id: 1, name: "Administrator", departmentId: 1 },
    { id: 2, name: "Office Manager", departmentId: 1 },

    // --- Department 2: Finance ---
    { id: 3, name: "Financial Analyst", departmentId: 2 },
    { id: 4, name: "Payroll Specialist", departmentId: 2 },

    // --- Department 3: Human Resources (HR) ---
    { id: 5, name: "HR Coordinator", departmentId: 3 },
    { id: 6, name: "Recruitment Specialist", departmentId: 3 },

    // --- Department 4: Marketing ---
    { id: 7, name: "Marketing Manager", departmentId: 4 },
    { id: 8, name: "Content Creator", departmentId: 4 },

    // --- Department 5: Sales ---
    { id: 9, name: "Sales Manager", departmentId: 5 },
    { id: 10, name: "Account Executive", departmentId: 5 },

    // --- Department 6: Engineering ---
    { id: 11, name: "Junior Software Engineer", departmentId: 6 },
    { id: 12, name: "Senior Software Engineer", departmentId: 6 },
    { id: 13, name: "Data Scientist", departmentId: 6 },

    // --- Department 7: Research & Development (R&D) ---
    { id: 14, name: "Research Scientist", departmentId: 7 },
    { id: 15, name: "Lab Technician", departmentId: 7 },
  ];

  await db.insert(positions).values(positionItems).onConflictDoNothing();

  console.log(
    `✅ Seeded ${positionItems.length} positions with department IDs.`
  );
};
