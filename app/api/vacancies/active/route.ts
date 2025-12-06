import { notFound, ok, serverError } from "@/src/lib/api-response";
import { db } from "@/src/lib/db";
import { departments, positions } from "@/src/lib/db/schema";
import { vacancies } from "@/src/lib/db/schema/vacancies";
import { vacancyPeriods } from "@/src/lib/db/schema/vacancyPeriods";
import { and, eq } from "drizzle-orm";

export async function GET() {
  try {
    const result = await db
      .select()
      .from(vacancyPeriods)
      .leftJoin(vacancies, eq(vacancyPeriods.vacancyId, vacancies.id))
      .leftJoin(departments, eq(departments.id, vacancies.departmentId))
      .leftJoin(positions, eq(positions.id, vacancies.positionId))
      .where(
        and(eq(vacancies.isActive, true), eq(vacancyPeriods.isActive, true))
      );

    if (!result.length) {
      return notFound("No active vacancies found");
    }

    return ok(result, "Active vacancies retrieved");
  } catch (error) {
    console.error(error);
    return serverError();
  }
}
