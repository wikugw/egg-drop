import { ok, serverError } from "@/src/lib/api-response";
import { db } from "@/src/lib/db";
import { positions } from "@/src/lib/db/schema";
import { eq, sql } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const departmentId = searchParams.get("departmentId");

    const baseQuery = db
      .select({
        value: sql`cast(${positions.id} as text)`,
        label: positions.name,
      })
      .from(positions);

    const result = departmentId
      ? await baseQuery.where(eq(positions.departmentId, Number(departmentId)))
      : await baseQuery;

    return ok(result, "Departments lookup retrieved");
  } catch (error) {
    console.error(error);
    return serverError();
  }
}
