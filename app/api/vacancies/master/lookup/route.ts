import { ok, serverError } from "@/src/lib/api-response";
import { db } from "@/src/lib/db";
import { vacancies } from "@/src/lib/db/schema/vacancies";
import { and, desc, eq, sql } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const numParam = (v: string | null) => (v === null ? undefined : Number(v));

    const departmentId = numParam(searchParams.get("departmentId"));
    const positionId = numParam(searchParams.get("positionId"));

    const filters = [
      eq(vacancies.isActive, true),
      departmentId && departmentId !== 0
        ? eq(vacancies.departmentId, departmentId)
        : undefined,
      positionId && positionId !== 0
        ? eq(vacancies.positionId, positionId)
        : undefined,
    ].filter(Boolean);

    const query = db
      .select({
        value: sql`cast(${vacancies.id} as text)`,
        label: vacancies.title,
      })
      .from(vacancies)
      .orderBy(desc(vacancies.updatedAt));

    if (filters.length > 1) {
      query.where(and(...filters));
    }

    const data = await query;

    return ok(data, "Lookup vacancies retrieved");
  } catch (error) {
    console.error(error);
    return serverError();
  }
}
