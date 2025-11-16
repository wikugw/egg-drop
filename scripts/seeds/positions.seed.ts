import { db } from "@/src/lib/db";
import { positions } from "@/src/lib/db/schema/positions";

export const seedPostions = async () => {
  await db
    .insert(positions)
    .values({
      id: 1,
      name: "Administrator",
    })
    .onConflictDoNothing();
};
