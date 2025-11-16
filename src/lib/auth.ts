import { compare } from "bcryptjs";

import { jwtVerify } from "jose";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { SessionPayload } from "../types/auth/session";

export async function verifyPassword(password: string, hashed: string) {
  return await compare(password, hashed);
}

export function signToken(payload: object) {
  return sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies(); // <- harus await
  const cookie = cookieStore.get("session")?.value;

  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(
      cookie,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );
    return payload as SessionPayload;
  } catch {
    return null;
  }
}
