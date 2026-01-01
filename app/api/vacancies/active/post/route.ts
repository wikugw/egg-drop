import { badRequest, created, notFound, ok } from "@/src/lib/api-response";
import { getSession } from "@/src/lib/auth";
import { db } from "@/src/lib/db";
import { vacancyPeriods } from "@/src/lib/db/schema/vacancyPeriods";
import { serverVacancyActiveSchema } from "@/src/lib/validation/vacancy-active";
import { and, eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = serverVacancyActiveSchema.safeParse(body);

    if (!parsed.success) {
      return badRequest("Invalid payload", parsed.error.flatten());
    }

    const session = await getSession();
    if (!session) return badRequest("Unauthorized", undefined);

    const { id, vacancyId, period, createdBy, updatedBy } = parsed.data;

    if (!period.from || !period.to) {
      return badRequest("Period is required", undefined);
    }

    // ===========================
    // UPDATE EXISTING PERIOD
    // ===========================
    if (id) {
      const exists = await db
        .select()
        .from(vacancyPeriods)
        .where(eq(vacancyPeriods.id, id));

      if (!exists.length) {
        return notFound("Vacancy period not found");
      }

      const updated = await db
        .update(vacancyPeriods)
        .set({
          startDate: new Date(period.from),
          endDate: new Date(period.to),
          updatedBy,
          updatedAt: new Date(),
        })
        .where(eq(vacancyPeriods.id, id))
        .returning();

      return ok(updated[0], "Vacancy period updated");
    }

    // ===========================
    // CREATE NEW PERIOD
    // ===========================
    const result = await db.transaction(async (tx) => {
      // 1️⃣ deactivate old active period (if any)
      await tx
        .update(vacancyPeriods)
        .set({
          isActive: false,
          updatedBy,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(vacancyPeriods.vacancyId, Number(vacancyId)),
            eq(vacancyPeriods.isActive, true)
          )
        );

      // 2️⃣ insert new period
      const inserted = await tx
        .insert(vacancyPeriods)
        .values([
          {
            startDate: new Date(period.from),
            endDate: new Date(period.to),
            isActive: true,
            createdBy,
            updatedBy,
            vacancyId: Number(vacancyId),
          },
        ])
        .returning();

      return inserted[0];
    });

    return created(result, "Vacancy period created");
  } catch (err) {
    console.error(err);
    return badRequest("Failed to process vacancy period", err);
  }
}
