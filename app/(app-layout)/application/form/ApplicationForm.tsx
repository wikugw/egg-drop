"use client";

import VacancyPreview from "@/app/(protected)/vacancy/active/form/Preview";
import { Card } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import ApplicationFormInner from "./Form";

export default function ApplicationForm() {
  const searchParams = useSearchParams();
  const vacancyPeriodIdParam = searchParams.get("vacancyPeriodId"); // string | null
  const vacancyPeriodId = vacancyPeriodIdParam
    ? vacancyPeriodIdParam
    : undefined;

  const applicationIdParam = searchParams.get("vacancyPeriodId"); // string | null
  const applicationId = applicationIdParam ? applicationIdParam : undefined;

  return (
    <div className="flex justify-between gap-2">
      <Card className="flex-1 shadow-md">
        <VacancyPreview id={vacancyPeriodId} />
      </Card>
      <div className="flex-1 shadow-md">
        <ApplicationFormInner
          vacancyPeriodId={vacancyPeriodId ?? ""}
          applicationId={applicationId ?? ""}
        />
      </div>
    </div>
  );
}
