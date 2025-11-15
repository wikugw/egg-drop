import jwt from "jsonwebtoken";

export function createJwt(payload: object) {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
}
