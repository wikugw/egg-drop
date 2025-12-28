import { z } from "zod";

export const vacancyActiveSchema = z.object({
  id: z.number().optional(), // untuk update

  departmentId: z.string().min(1, "Department is required"),
  positionId: z.string().min(1, "Position is required"),

  vacancyId: z.string().min(1, "Vacancy is required"),
  period: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .refine((val) => val.from, {
      message: "Start date is required",
      path: ["from"],
    })
    .refine((val) => val.to, {
      message: "End date is required",
      path: ["to"],
    })
    .refine((val) => val.from && val.to && val.from <= val.to, {
      message: "End date must be after start date",
      path: ["to"],
    }),

  createdBy: z.string().min(1, "createdBy is required"),
  updatedBy: z.string().min(1, "updatedBy is required"),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type VacancyActiveFormType = z.infer<typeof vacancyActiveSchema>;
