import "dotenv/config";
import { seedDepartments } from "./departments.seed";
import { seedEmployees } from "./employees.seed";
import { seedPostions } from "./positions.seed";
import { seedUsers } from "./users.seed";

async function main() {
  await seedUsers();
  await seedDepartments();
  await seedPostions();
  await seedEmployees();
  console.log("Seeding selesai!");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
