"use client";

import { DepartmentDropdown } from "@/components/form/combo-box/Department";
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
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function VacancyForm({ vacancyId }: { vacancyId?: number }) {
  const form = useForm<VacancyFormType>({
    resolver: zodResolver(vacancySchema),
    defaultValues: {
      title: "",
      description: "",
      requirements: "",
      responsibilities: "",
      departmentId: 0,
      positionId: 0,
      salaryMin: 0,
      salaryMax: 0,
      createdBy: 0,
      updatedBy: 0,
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
      return api.post<unknown, VacancyFormType>("/api/vacancies", values);
    },
    onSuccess: () => {
      window.location.href = "/dashboard";
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

      {JSON.stringify(form.watch())}

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

              <FormInputField
                control={form.control}
                name="positionId"
                label="Position ID"
                type="number"
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
