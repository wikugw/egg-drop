import { z } from "zod";

export const applicationFormSchema = z.object({
  id: z.number().optional(), // untuk update

  name: z.string().min(1, "Title is required"),

  email: z.string().min(1, "Email is required"),
  experience: z.string().min(1, "Experience is required"),
  skill: z.string().min(1, "Skill is required"),

  vacancyPeriodId: z.string().min(1, "Department is required"),

  createdBy: z.string().min(1, "createdBy is required"),
  updatedBy: z.string().min(1, "updatedBy is required"),

  isActive: z.boolean().optional(), // default true di DB

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type ApplicationFormType = z.infer<typeof applicationFormSchema>;
