import { ok, serverError } from "@/src/lib/api-response";
import { db } from "@/src/lib/db";
import { departments } from "@/src/lib/db/schema";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    const result = await db
      .select({
        value: sql`cast(${departments.id} as text)`,
        label: departments.name,
      })
      .from(departments);

    return ok(result, "Departments lookup retrieved");
  } catch (error) {
    console.error(error);
    return serverError();
  }
}
