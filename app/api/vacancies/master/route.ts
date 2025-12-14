import { badRequest, notFound, ok, serverError } from "@/src/lib/api-response";
import { db } from "@/src/lib/db";
import { departments, positions } from "@/src/lib/db/schema";
import { vacancies } from "@/src/lib/db/schema/vacancies";
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
        id: vacancies.id,
        title: vacancies.title,
        departmentName: departments.name,
        positionName: positions.name,
        departmentId: vacancies.departmentId,
        positionId: vacancies.positionId,
        salaryMin: vacancies.salaryMin,
        salaryMax: vacancies.salaryMax,
        isActive: vacancies.isActive,
        description: vacancies.description,
        requirements: vacancies.requirements,
        responsibilities: vacancies.responsibilities,
      })
      .from(vacancies)
      .leftJoin(departments, eq(departments.id, vacancies.departmentId))
      .leftJoin(positions, eq(positions.id, vacancies.positionId))
      .where(and(eq(vacancies.id, id), eq(vacancies.isActive, true)));

    if (result.length == 0) return notFound();

    return ok(result[0], "Vacancy detail retrieved");
  } catch (error) {
    console.error(error);
    return serverError();
  }
}
