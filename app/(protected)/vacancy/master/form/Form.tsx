"use client";

import { DepartmentDropdown } from "@/components/form/combo-box/Department";
import { PositionDropdown } from "@/components/form/combo-box/Position";
import { FormInputField } from "@/components/form/FormInputField";
import { FormTextareaField } from "@/components/form/FormTextAreaField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Loading } from "@/components/ui/loading";
import { useVacancyDetail } from "@/hooks/modules/vacancy/master/use-vacancy-detail";
import { api } from "@/src/lib/fetch-json";
import { errorAlert, successAlert } from "@/src/lib/swal/swal";
import { VacancyFormType, vacancySchema } from "@/src/lib/validation/vacancy";
import { RootState } from "@/src/store";
import { ApiError } from "@/src/types/responses/generic-response";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";

export default function VacancyForm() {
  const router = useRouter();
  const employee = useSelector((state: RootState) => state.employee.data);

  const form = useForm<VacancyFormType>({
    resolver: zodResolver(vacancySchema),
    defaultValues: {
      title: "",
      description: "",
      requirements: "",
      responsibilities: "",
      departmentId: "",
      positionId: "",
      salaryMin: 0,
      salaryMax: 0,
      createdBy: "",
      updatedBy: "",
    },
  });

  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // string | null
  const vacancyId = id ? id : undefined;

  const { data, isLoading } = useVacancyDetail(vacancyId);

  useEffect(() => {
    if (data) {
      form.reset({
        ...data,
        departmentId: String(data.departmentId),
        positionId: String(data.positionId),
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
      successAlert("Vacancy Submitted!").then(() =>
        router.push("/vacancy/master/list")
      );
    },
    onError: (e: ApiError) => {
      errorAlert(e.message);
    },
  });

  const onSubmit = async () => {
    form.reset({
      ...form.getValues(),
      createdBy: employee.email,
      updatedBy: employee.email,
    });
    const values = form.getValues();

    const isValid = await form.trigger();

    if (!isValid) {
      console.log("Form tidak valid");
      return;
    }

    mutation.mutate(values);
  };

  const departmentId = useWatch({
    control: form.control,
    name: "departmentId",
  });

  if (isLoading) return <Loading />;

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>{vacancyId ? "Edit Vacancy" : "Create Vacancy"}</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <div className="space-y-6">
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
                departmentId={String(departmentId)}
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

            <Button type="submit" className="w-full" onClick={onSubmit}>
              {vacancyId ? "Update Vacancy" : "Create Vacancy"}
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
