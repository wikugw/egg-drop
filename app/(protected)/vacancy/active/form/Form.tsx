"use client";

import { checkVacancyActive, postVacancy } from "@/clients/modules/active-form";
import { DepartmentDropdown } from "@/components/form/combo-box/Department";
import { PositionDropdown } from "@/components/form/combo-box/Position";
import { VacancyDropdown } from "@/components/form/combo-box/Vacancy";
import { FormDateRangeField } from "@/components/form/FormDateRange";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Loading } from "@/components/ui/loading";
import { useVacancyActiveDetail } from "@/hooks/modules/vacancy/active/use-vacancy-active-detail";
import { today } from "@/src/helper/date";
import { errorAlert, successAlert } from "@/src/lib/swal/swal";
import {
  clientVacancyActiveSchema,
  VacancyActiveFormType,
} from "@/src/lib/validation/vacancy-active";
import { RootState } from "@/src/store";
import { ApiError } from "@/src/types/responses/generic-response";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
import VacancyPreview from "./Preview";

export default function VacancyForm() {
  const router = useRouter();
  const employee = useSelector((state: RootState) => state.employee.data);

  const form = useForm<VacancyActiveFormType>({
    resolver: zodResolver(clientVacancyActiveSchema),
    defaultValues: {
      departmentId: "",
      positionId: "",
      vacancyId: "",
      createdBy: "",
      updatedBy: "",
      period: undefined,
    },
  });

  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // string | null
  const vacancyActiveId = id ? id : undefined;

  const submitMutation = useMutation({
    mutationFn: async (values: VacancyActiveFormType) => {
      const check = await checkVacancyActive(values.vacancyId, today());

      if (check.data?.id) {
        throw new Error("Active vacancy already exists");
      }

      return postVacancy(values);
    },
    onSuccess: () => {
      successAlert("Vacancy Submitted!").then(() =>
        router.push("/vacancy/master/list")
      );
    },
    onError: (e: ApiError | Error) => {
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
      console.log(form.formState.errors.period);
      return;
    }

    submitMutation.mutate(values);
  };

  const departmentId = useWatch({
    control: form.control,
    name: "departmentId",
  });

  const positionId = useWatch({
    control: form.control,
    name: "positionId",
  });

  const vacancyId = useWatch({
    control: form.control,
    name: "vacancyId",
  });

  const { data, isLoading } = useVacancyActiveDetail(vacancyActiveId);

  useEffect(() => {
    if (data) {
      form.reset({
        ...data,
        departmentId: String(data.departmentId),
        positionId: String(data.positionId),
        vacancyId: String(data.vacancyId),
        period: {
          from: new Date(data.startDate),
          to: new Date(data.endDate),
        },
      });
    }
  }, [data, form]);

  if (isLoading) return <Loading />;

  return (
    <div className="flex justify-between gap-2">
      <Card className="flex-1 shadow-md">
        <CardHeader>
          <CardTitle>
            {vacancyActiveId ? "Edit Vacancy" : "Create Vacancy"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <div className="space-y-6">
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
              </div>

              <div className="grid grid-cols-1 gap-6">
                <VacancyDropdown
                  departmentId={String(departmentId)}
                  positionId={String(positionId)}
                  control={form.control}
                  name="vacancyId"
                  label="Vacancy"
                  placeholder="Vacancy"
                />

                <FormDateRangeField
                  control={form.control}
                  name="period"
                  label="Periode"
                />
              </div>

              <Button type="submit" className="w-full" onClick={onSubmit}>
                {vacancyActiveId ? "Update Vacancy" : "Create Vacancy"}
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
      <Card className="flex-1 shadow-md">
        <VacancyPreview id={vacancyId} />
      </Card>
    </div>
  );
}
