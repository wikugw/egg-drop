"use client";

import { DataTable } from "@/components/table/data-table";
import { useVacancyMasterList } from "@/hooks/modules/vacancy/master/use-vacancy-master-list";
import { columns } from "./Column";

export default function Table() {
  const { data, isLoading } = useVacancyMasterList();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="py-2">
      <DataTable columns={columns} data={data ?? []} />
    </div>
  );
}
