import { ok, serverError } from "@/src/lib/api-response";
import { db } from "@/src/lib/db";
import { departments, positions } from "@/src/lib/db/schema";
import { vacancies } from "@/src/lib/db/schema/vacancies";
import { eq, sql } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("id") ?? 1);
    const pageLength = Number(searchParams.get("pageLength") ?? 10);

    const limit = pageLength;
    const offset = (page - 1) * pageLength;

    // =====================
    // Query data (paginated)
    // =====================
    const data = await db
      .select({
        id: vacancies.id,
        title: vacancies.title,
        departmentName: departments.name,
        positionName: positions.name,
        departmentId: departments.id,
        positionId: positions.id,
        salaryMin: vacancies.salaryMin,
        salaryMax: vacancies.salaryMax,
        isActive: vacancies.isActive,
      })
      .from(vacancies)
      .leftJoin(departments, eq(departments.id, vacancies.departmentId))
      .leftJoin(positions, eq(positions.id, vacancies.positionId))
      .where(eq(vacancies.isActive, true))
      .limit(limit)
      .offset(offset);

    // =====================
    // Query total count
    // =====================
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(vacancies)
      .where(eq(vacancies.isActive, true));

    return ok(
      {
        data,
        page,
        pageLength,
        total: Number(count),
      },
      "Active vacancies retrieved"
    );
  } catch (error) {
    console.error(error);
    return serverError();
  }
}
