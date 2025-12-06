import { z } from "zod";

export const vacancySchema = z.object({
  id: z.number().optional(), // untuk update

  vacancyCode: z.string().max(50).optional(), // optional

  title: z.string().min(1, "Title is required"),

  description: z.string().optional().nullable(),
  requirements: z.string().optional().nullable(),
  responsibilities: z.string().optional().nullable(),

  departmentId: z.number().min(1, "Department is required"),
  positionId: z.number().min(1, "Position is required"),
  createdBy: z.number().min(1, "createdBy is required"),
  updatedBy: z.number().min(1, "updatedBy is required"),

  salaryMin: z.number().min(1, "salaryMin is required"),
  salaryMax: z.number().min(1, "salaryMax is required"),

  isActive: z.boolean().optional(), // default true di DB

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type VacancyFormType = z.infer<typeof vacancySchema>;
