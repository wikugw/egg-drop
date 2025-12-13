"use client";

import { DepartmentDropdown } from "@/components/form/combo-box/Department";
import { PositionDropdown } from "@/components/form/combo-box/Position";
import { FormInputField } from "@/components/form/FormInputField";
import { FormTextareaField } from "@/components/form/FormTextAreaField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useVacancyDetail } from "@/hooks/modules/vacancy/use-vacancy-detail";
import { api } from "@/src/lib/fetch-json";
import { VacancyFormType, vacancySchema } from "@/src/lib/validation/vacancy";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function VacancyForm({ vacancyId }: { vacancyId?: number }) {
  const router = useRouter();

  const form = useForm<VacancyFormType>({
    resolver: zodResolver(vacancySchema),
    // defaultValues: {
    //   title: "Front End Enginner",
    //   description: "",
    //   requirements: "",
    //   responsibilities: "",
    //   departmentId: 0,
    //   positionId: 0,
    //   salaryMin: 0,
    //   salaryMax: 0,
    //   createdBy: 0,
    //   updatedBy: 0,
    // },
    defaultValues: {
      title: "Front End Engineer",
      description:
        "We are looking for a Front End Engineer to build scalable and user-friendly web applications.",
      requirements: `
- Bachelor's degree in Computer Science or related field
- Minimum 2 years experience as Front End Developer
- Strong knowledge of HTML, CSS, JavaScript
- Experience with React or Vue
- Familiar with REST API integration
  `.trim(),
      responsibilities: `
- Develop and maintain front end features
- Collaborate with UI/UX designers
- Optimize applications for maximum performance
- Write clean and maintainable code
  `.trim(),
      departmentId: "1",
      positionId: "2",
      salaryMin: 8000000,
      salaryMax: 15000000,
      createdBy: 1,
      updatedBy: 1,
    },
  });

  const { data, isLoading } = useVacancyDetail(vacancyId);

  useEffect(() => {
    if (data) {
      form.reset({
        ...data,
      });
    }
  }, [data, form]);

  const mutation = useMutation({
    mutationFn: async (values: VacancyFormType) => {
      return api.post<unknown, VacancyFormType>(
        "/api/vacancies/master/post",
        values
      );
    },
    onSuccess: () => {
      router.push("/vacancy/active-list");
    },
  });

  const onSubmit = async (values: VacancyFormType) => {
    mutation.mutate(values);
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>{vacancyId ? "Edit Vacancy" : "Create Vacancy"}</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <FormInputField
                control={form.control}
                name="title"
                label="Title"
                placeholder="Vacancy title"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DepartmentDropdown
                control={form.control}
                name="departmentId"
                label="Department ID"
                placeholder="Department ID"
              />

              <PositionDropdown
                departmentId={String(form.watch().departmentId)}
                control={form.control}
                name="positionId"
                label="Position ID"
                placeholder="Position ID"
              />

              <FormInputField
                control={form.control}
                name="salaryMin"
                label="Salary Min"
                type="number"
                placeholder="Minimum salary"
              />

              <FormInputField
                control={form.control}
                name="salaryMax"
                label="Salary Max"
                type="number"
                placeholder="Maximum salary"
              />
            </div>

            {/* Textarea full width */}
            <div className="grid grid-cols-1 gap-6">
              <FormTextareaField
                control={form.control}
                name="description"
                label="Description"
                placeholder="Job description..."
              />

              <FormTextareaField
                control={form.control}
                name="requirements"
                label="Requirements"
                placeholder="Job requirements..."
              />

              <FormTextareaField
                control={form.control}
                name="responsibilities"
                label="Responsibilities"
                placeholder="Job responsibilities..."
              />
            </div>

            <Button type="submit" className="w-full">
              {vacancyId ? "Update Vacancy" : "Create Vacancy"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
