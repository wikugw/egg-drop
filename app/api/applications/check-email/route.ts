import { rateLimit } from "@/src/helper/rate-limiter";
import { badRequest, notFound, ok, serverError } from "@/src/lib/api-response";
import { db } from "@/src/lib/db";
import { applicants } from "@/src/lib/db/schema";
import { and, eq } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    // 1️⃣ IP RATE LIMIT
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";

    if (!rateLimit(ip)) {
      return badRequest("Too many requests", undefined);
    }
    const { searchParams } = new URL(request.url);
    const emailParam = searchParams.get("email");

    if (!emailParam) {
      return badRequest("Email is required", null);
    }

    const result = await db
      .select()
      .from(applicants)
      .where(
        and(eq(applicants.email, emailParam), eq(applicants.isActive, true))
      );

    if (!result.length) {
      return notFound("No Applicant found");
    }

    return ok(result[0], "Applicant retrieved");
  } catch (error) {
    console.error(error);
    return serverError();
  }
}
