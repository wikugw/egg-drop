import { badRequest, ok, serverError } from "@/src/lib/api-response";
import { db } from "@/src/lib/db";
import { vacancyPeriods } from "@/src/lib/db/schema";
import { and, eq, gte, lte } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get("id");
    const selectedDate = new Date(String(searchParams.get("selectedDate")));

    if (!idParam) {
      return badRequest("id is required", null);
    }

    if (!selectedDate) {
      return badRequest("selectedDate is required", null);
    }

    const id = Number(idParam);

    if (Number.isNaN(id)) {
      return badRequest("Invalid vacancy id", null);
    }

    const result = await db
      .select({
        id: vacancyPeriods.id,
      })
      .from(vacancyPeriods)
      .where(
        and(
          eq(vacancyPeriods.vacancyId, id),
          eq(vacancyPeriods.isActive, true),
          and(
            lte(vacancyPeriods.startDate, new Date(selectedDate)),
            gte(vacancyPeriods.endDate, new Date(selectedDate))
          )
        )
      );

    return ok(result[0], "Vacancy Active retrieved");
  } catch (error) {
    console.error(error);
    return serverError();
  }
}
