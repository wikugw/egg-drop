"use client";

import { checkApplicant } from "@/clients/modules/application";
import { FormInputField } from "@/components/form/FormInputField";
import { FormTextareaField } from "@/components/form/FormTextAreaField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Loading } from "@/components/ui/loading";

import { api } from "@/src/lib/fetch-json";
import {
  confirmationModal,
  errorAlert,
  successAlert,
} from "@/src/lib/swal/swal";
import {
  applicationFormSchema,
  ApplicationFormType,
} from "@/src/lib/validation/application/application-form";

import { RootState } from "@/src/store";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

/* =======================
   PROPS
======================= */
type ApplicationFormProps = {
  vacancyPeriodId: string;
  applicationId: string;
};

/* =======================
   COMPONENT
======================= */
export default function ApplicationFormInner({
  vacancyPeriodId,
  applicationId,
}: ApplicationFormProps) {
  const router = useRouter();
  const employee = useSelector((state: RootState) => state.employee.data);

  /* =======================
     FORM SETUP
  ======================= */
  const form = useForm<ApplicationFormType>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      experience: "",
      skill: "",
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
        values,
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

  const { mutate: checkEmailMutate, isPending } = useMutation({
    mutationFn: (email: string) => checkApplicant(email),
    onSuccess: (res, email) => {
      // Jalankan logic modal hanya jika data ditemukan
      if (res?.data?.id) {
        confirmationModal({
          title: "Data Ditemukan",
          text: "Email ini pernah melamar sebelumnya. Gunakan data lama?",
          confirmText: "Ya, Pakai Data Lama",
          cancelText: "Input Baru",
        }).then((result) => {
          if (result.isConfirmed) {
            form.reset({
              ...form.getValues(),
              email: email, // Pastikan email tetap ada
              name: res.data.fullName,
              experience: res.data.experience ?? "",
              skill: res.data.skill ?? "",
            });
          }
        });
      }
    },
    onError: (error) => {
      console.error("Gagal mengecek email:", error);
    },
  });

  // Di dalam komponen form kamu
  const debouncedCheckEmail = useDebouncedCallback(async (email: string) => {
    // Validasi format email sebelum tembak API
    if (email.includes("@") && email.includes(".")) {
      checkEmailMutate(email);
    }
  }, 700); // Tunggu 700ms setelah user berhenti mengetik

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
            {/* EMAIL */}
            <FormInputField
              control={form.control}
              name="email"
              label="Email"
              placeholder="your@email.com"
              onValueChange={(value) => debouncedCheckEmail(String(value))}
            />

            {isPending && (
              <div className="text-xs animate-pulse mt-1">
                Sedang mengecek email...
              </div>
            )}
            {/* NAME */}
            <FormInputField
              control={form.control}
              name="name"
              label="Full Name"
              placeholder="Your full name"
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
