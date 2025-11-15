import { compare } from "bcryptjs";

import { sign } from "jsonwebtoken";

export async function verifyPassword(password: string, hashed: string) {
  return await compare(password, hashed);
}

export function signToken(payload: object) {
  return sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
}
