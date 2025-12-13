import { badRequest, created, notFound, ok } from "@/src/lib/api-response";
import { getSession } from "@/src/lib/auth";
import { db } from "@/src/lib/db";
import { vacancies } from "@/src/lib/db/schema/vacancies";
import { generateV4String } from "@/src/lib/uuid";
import { vacancySchema } from "@/src/lib/validation/vacancy";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Ambil id (jika ada)
    const id = body.id ? Number(body.id) : null;

    // Validasi payload
    const parsed = vacancySchema.safeParse(body);
    if (!parsed.success) {
      return badRequest("Invalid payload", parsed.error.flatten());
    }

    const session = await getSession();
    if (!session) return badRequest("Unauthorized", undefined);

    const data = parsed.data;

    // ===========================
    //   UPDATE LOGIC
    // ===========================
    if (id) {
      const exists = await db
        .select()
        .from(vacancies)
        .where(eq(vacancies.id, id));

      if (exists.length === 0) return notFound("Vacancy not found");

      const updated = await db
        .update(vacancies)
        .set({
          ...data,
          departmentId: Number(data.departmentId),
          positionId: Number(data.positionId),
          updatedBy: Number(session.id),
          updatedAt: new Date(),
        })
        .where(eq(vacancies.id, id))
        .returning();

      return ok(updated[0], "Vacancy updated");
    }

    // ===========================
    //   CREATE LOGIC
    // ===========================
    const inserted = await db
      .insert(vacancies)
      .values({
        ...data,
        departmentId: Number(data.departmentId),
        positionId: Number(data.positionId),
        vacancyCode: generateV4String(),
        createdBy: Number(session.id),
        updatedBy: Number(session.id),
      })
      .returning();

    return created(inserted[0], "Vacancy created");
  } catch (err) {
    return badRequest("Failed to process vacancy", err);
  }
}
