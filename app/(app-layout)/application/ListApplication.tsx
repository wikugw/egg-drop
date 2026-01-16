"use client";

import { PositionDropdown } from "@/components/form/combo-box/Position";
import { Form } from "@/components/ui/form";
import { Loading } from "@/components/ui/loading";
import { NotFound } from "@/components/ui/not-found";
import { useVacancyActiveList } from "@/hooks/modules/vacancy/active/use-vacancy-active-list";
import { today } from "@/src/helper/date";
import {
  ApplicationListFilterSchema,
  applicationListFilterSchema,
} from "@/src/lib/validation/application/application";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import ApplicationCard from "./components/ApplicationCard";
import NextPrevPagintaion from "./components/Pagination";

export default function ListApplication() {
  const [page, setPage] = useState(1);
  const pageLength = 10;

  const form = useForm<ApplicationListFilterSchema>({
    resolver: zodResolver(applicationListFilterSchema),
    defaultValues: {
      positionId: "",
    },
  });

  const positionId = useWatch({
    control: form.control,
    name: "positionId",
  });

  const { data, isLoading } = useVacancyActiveList(
    page,
    pageLength,
    today(),
    positionId
  );

  const vacancies = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / pageLength);

  return (
    <div className="space-y-6">
      <Form {...form}>
        <div className="space-y-6">
          <div className="mb-2">Filter</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PositionDropdown
              departmentId={String("")}
              control={form.control}
              name="positionId"
              label="Position ID"
              placeholder="Position ID"
            />
          </div>
        </div>
      </Form>

      {/* GRID CARD */}

      {isLoading ? (
        <Loading />
      ) : vacancies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vacancies.map((item) => (
            <ApplicationCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <NotFound />
      )}

      {/* PAGINATION */}
      <NextPrevPagintaion
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => p - 1)}
        onNext={() => setPage((p) => p + 1)}
      />
    </div>
  );
}
