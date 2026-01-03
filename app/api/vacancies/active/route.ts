import { badRequest, notFound, ok, serverError } from "@/src/lib/api-response";
import { db } from "@/src/lib/db";
import { departments, positions } from "@/src/lib/db/schema";
import { vacancies } from "@/src/lib/db/schema/vacancies";
import { vacancyPeriods } from "@/src/lib/db/schema/vacancyPeriods";
import { and, eq } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get("id");

    if (!idParam) {
      return badRequest("Vacancy id is required", null);
    }

    const id = Number(idParam);

    if (Number.isNaN(id)) {
      return badRequest("Invalid vacancy id", null);
    }

    const result = await db
      .select({
        id: vacancyPeriods.id,
        vacancyId: vacancyPeriods.vacancyId,
        departmentId: departments.id,
        positionId: positions.id,
        startDate: vacancyPeriods.startDate,
        endDate: vacancyPeriods.endDate,
      })
      .from(vacancyPeriods)
      .leftJoin(vacancies, eq(vacancyPeriods.vacancyId, vacancies.id))
      .leftJoin(departments, eq(departments.id, vacancies.departmentId))
      .leftJoin(positions, eq(positions.id, vacancies.positionId))
      .where(
        and(
          eq(vacancyPeriods.id, id),
          eq(vacancies.isActive, true),
          eq(vacancyPeriods.isActive, true)
        )
      );

    if (!result.length) {
      return notFound("No active vacancies found");
    }

    return ok(result[0], "Active vacancies retrieved");
  } catch (error) {
    console.error(error);
    return serverError();
  }
}
