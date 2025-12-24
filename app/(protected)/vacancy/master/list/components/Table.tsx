"use client";

import { DataTable } from "@/components/table/data-table";
import { useVacancyMasterList } from "@/hooks/modules/vacancy/master/use-vacancy-master-list";
import { useState } from "react";
import { columns } from "./Column";

export default function Table() {
  const [page, setPage] = useState(1);
  const pageLength = 10;

  const { data, isLoading } = useVacancyMasterList(page, pageLength);

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
