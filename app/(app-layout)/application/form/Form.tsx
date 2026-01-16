"use client";

import { FormInputField } from "@/components/form/FormInputField";
import { FormTextareaField } from "@/components/form/FormTextAreaField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Loading } from "@/components/ui/loading";

import { api } from "@/src/lib/fetch-json";
import { errorAlert, successAlert } from "@/src/lib/swal/swal";
import {
  applicationFormSchema,
  ApplicationFormType,
} from "@/src/lib/validation/application/application-form";

import { RootState } from "@/src/store";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

/* =======================
   PROPS
======================= */
type ApplicationFormProps = {
  vacancyPeriodId: string;
};

/* =======================
   COMPONENT
======================= */
export default function ApplicationFormInner({
  vacancyPeriodId,
}: ApplicationFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const employee = useSelector((state: RootState) => state.employee.data);

  const applicationId = searchParams.get("applicationId") ?? undefined;

  /* =======================
     FORM SETUP
  ======================= */
  const form = useForm<ApplicationFormType>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      id: undefined,
      name: "Wiku Galindra Wardhana",
      email: "wikugalindrawardhana15@gmail.com",
      experience: "software engineer",
      skill: "html css",
      vacancyPeriodId,
      createdBy: "",
      updatedBy: "",
      isActive: true,
    },
  });

  /* =======================
     FETCH DETAIL (EDIT)
  ======================= */
  const { data, isLoading } = useApplicationDetail(applicationId);

  useEffect(() => {
    if (data) {
      form.reset({
        id: data.id,
        name: data.name,
        email: data.email,
        experience: data.experience,
        skill: data.skill,
        vacancyPeriodId: data.vacancyPeriodId,
        isActive: data.isActive,
        createdBy: data.createdBy,
        updatedBy: data.updatedBy,
      });
    }
  }, [data, form]);

  /* =======================
     MUTATION
  ======================= */
  const mutation = useMutation({
    mutationFn: async (values: ApplicationFormType) => {
      return api.post<void, ApplicationFormType>(
        "/api/applications/post",
        values
      );
    },
    onSuccess: () => {
      successAlert("Application submitted!").then(() => {
        router.push("/application/list");
      });
    },
    onError: (e: ApiError) => {
      errorAlert(e.message);
    },
  });

  /* =======================
     SUBMIT
  ======================= */
  const onSubmit = () => {
    form.reset({
      ...form.getValues(),
      createdBy: form.getValues().email,
      updatedBy: form.getValues().email,
    });
    const values = form.getValues();
    console.log(values);
    mutation.mutate(values);
  };

  if (isLoading) return <Loading />;

  /* =======================
     RENDER
  ======================= */
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>
          {applicationId ? "Edit Application" : "Submit Application"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* NAME */}
            <FormInputField
              control={form.control}
              name="name"
              label="Full Name"
              placeholder="Your full name"
            />

            {/* EMAIL */}
            <FormInputField
              control={form.control}
              name="email"
              label="Email"
              placeholder="your@email.com"
            />

            {/* EXPERIENCE */}
            <FormTextareaField
              control={form.control}
              name="experience"
              label="Experience"
              placeholder="Describe your working experience..."
            />

            {/* SKILL */}
            <FormTextareaField
              control={form.control}
              name="skill"
              label="Skill"
              placeholder="List your skills..."
            />

            <Button
              className="w-full"
              disabled={mutation.isPending}
              onClick={onSubmit}
            >
              {applicationId ? "Update Application" : "Submit Application"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

/* =======================
   MOCK HOOK (CONTOH)
   Ganti dengan hook asli kamu
======================= */
function useApplicationDetail(id?: string) {
  return {
    data: undefined as any,
    isLoading: false,
  };
}
