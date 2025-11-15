import "dotenv/config";
import { seedUsers } from "./users.seed";

async function main() {
  await seedUsers();
  console.log("Seeding selesai!");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
