import { z } from "zod";

export const applicationListFilterSchema = z.object({
  positionId: z.string(),
});

export type ApplicationListFilterSchema = z.infer<
  typeof applicationListFilterSchema
>;
