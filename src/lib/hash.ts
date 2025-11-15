import { compare as bcryptCompare, hash as bcryptHash } from "bcryptjs";

export const hashPassword = (plain: string) => bcryptHash(plain, 10);
export const comparePassword = (plain: string, hashed: string) =>
  bcryptCompare(plain, hashed);
