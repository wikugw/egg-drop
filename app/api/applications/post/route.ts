import { APPLICATION_STATUS } from "@/src/constants/recruitment-status";
import { rateLimit } from "@/src/helper/rate-limiter";
import { badRequest, created } from "@/src/lib/api-response";
import { db } from "@/src/lib/db";
import { applicants, applications } from "@/src/lib/db/schema";
import { applicationFormSchema } from "@/src/lib/validation/application/application-form";

export async function POST(req: Request) {
  try {
    // 1️⃣ IP RATE LIMIT
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";

    if (!rateLimit(ip)) {
      return badRequest("Too many requests", undefined);
    }

    // 2️⃣ PARSE & VALIDASI
    const body = await req.json();
    const parsed = applicationFormSchema.safeParse(body);

    if (!parsed.success) {
      return badRequest("Invalid payload", parsed.error.flatten());
    }

    const {
      name,
      email,
      experience,
      skill,
      vacancyPeriodId,
      createdBy,
      updatedBy,
      isActive,
    } = parsed.data;

    // 3️⃣ UPSERT APPLICANT
    await db
      .insert(applicants)
      .values({
        email,
        fullName: name,
        experience,
        skill,
        isActive,
        createdBy,
        updatedBy,
      })
      .onConflictDoUpdate({
        target: applicants.email,
        set: {
          fullName: name,
          experience,
          skill,
          updatedAt: new Date(),
          updatedBy,
        },
      });

    // 4️⃣ UPSERT APPLICATION
    await db
      .insert(applications)
      .values({
        email,
        vacancyperiodId: Number(vacancyPeriodId),
        status: APPLICATION_STATUS.SUBMITTED,
        isActive,
        createdBy,
        updatedBy,
      })
      .onConflictDoUpdate({
        target: [applications.email, applications.vacancyperiodId],
        set: {
          updatedAt: new Date(),
          updatedBy,
        },
      });

    return created(undefined, "Application submitted");
  } catch (err) {
    console.error(err);
    return badRequest("Failed to process application", err);
  }
}
