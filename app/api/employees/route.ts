import { badRequest, notFound, ok, serverError } from "@/src/lib/api-response";
import { db } from "@/src/lib/db";
import { departments, employees, positions, users } from "@/src/lib/db/schema";
import { and, eq } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    console.log("start");
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return badRequest("Email is required", null);
    }

    console.log(email);

    const result = await db
      .select({
        employeeId: employees.employeeId,
        email: users.email,
        departmentName: departments.name,
        position: positions.name,
      })
      .from(employees)
      .leftJoin(users, eq(users.id, employees.userId))
      .leftJoin(positions, eq(positions.id, employees.positionId))
      .leftJoin(departments, eq(departments.id, employees.departmentId))
      .where(and(eq(users.email, email)));

    if (result.length == 0) return notFound();

    console.log(result);

    return ok(result[0], "Vacancy detail retrieved");
  } catch (error) {
    console.error(error);
    return serverError();
  }
}
