import { ok, serverError } from "@/src/lib/api-response";
import { db } from "@/src/lib/db";
import { departments, positions, vacancyPeriods } from "@/src/lib/db/schema";
import { vacancies } from "@/src/lib/db/schema/vacancies";
import { and, desc, eq, gte, lte, sql } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") ?? 1);
    const pageLength = Number(searchParams.get("pageLength") ?? 10);
    const selectedDateParam = searchParams.get("selectedDate");
    const positionIdParam = searchParams.get("positionId");

    const selectedDate = selectedDateParam
      ? new Date(selectedDateParam)
      : undefined;

    const positionId = positionIdParam ? Number(positionIdParam) : undefined;

    const limit = pageLength;
    const offset = (page - 1) * pageLength;

    // =====================
    // Shared WHERE clause
    // =====================
    const whereClause = and(
      eq(vacancyPeriods.isActive, true),

      selectedDate
        ? and(
            lte(vacancyPeriods.startDate, selectedDate),
            gte(vacancyPeriods.endDate, selectedDate)
          )
        : undefined,

      positionId ? eq(vacancies.positionId, positionId) : undefined
    );

    // =====================
    // Query data (paginated)
    // =====================
    const data = await db
      .select({
        id: vacancyPeriods.id,
        title: vacancies.title,
        departmentName: departments.name,
        positionName: positions.name,
        departmentId: departments.id,
        positionId: positions.id,
        salaryMin: vacancies.salaryMin,
        salaryMax: vacancies.salaryMax,
        startDate: vacancyPeriods.startDate,
        endDate: vacancyPeriods.endDate,
      })
      .from(vacancyPeriods)
      .leftJoin(vacancies, eq(vacancyPeriods.vacancyId, vacancies.id))
      .leftJoin(departments, eq(departments.id, vacancies.departmentId))
      .leftJoin(positions, eq(positions.id, vacancies.positionId))
      .where(whereClause)
      .orderBy(desc(vacancies.updatedAt))
      .limit(limit)
      .offset(offset);

    // =====================
    // Query total count
    // =====================
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(vacancyPeriods)
      .leftJoin(vacancies, eq(vacancyPeriods.vacancyId, vacancies.id))
      .where(whereClause);

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
    return serverError(JSON.stringify(error));
  }
}
