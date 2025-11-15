import { db } from "@/src/lib/db";
import { users } from "@/src/lib/db/schema";
import { hashPassword } from "@/src/lib/hash";

export const seedUsers = async () => {
  const password = await hashPassword("password123");

  await db
    .insert(users)
    .values({
      email: "admin@example.com",
      password,
    })
    .onConflictDoNothing(); // tidak error kalau sudah ada
};
