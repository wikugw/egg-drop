"use client";

import { DataTable } from "@/components/table/data-table";
import { useVacancyActiveList } from "@/hooks/modules/vacancy/active/use-vacancy-active-list";
import { useState } from "react";
import { columns } from "./Column";

const today = new Date();

export default function Table() {
  const [page, setPage] = useState(1);
  const pageLength = 10;

  const { data, isLoading } = useVacancyActiveList(page, pageLength, today);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="py-2">
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        page={page}
        pageLength={pageLength}
        total={data?.total ?? 0}
        onPageChange={setPage}
      />
    </div>
  );
}
