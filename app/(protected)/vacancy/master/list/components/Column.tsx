"use client";

import { Button } from "@/components/ui/button";
import { toIdr } from "@/src/helper/currency";
import { VacancyMasterResponse } from "@/src/types/modules/vacancy/master/list/reponse";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<VacancyMasterResponse>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "departmentName",
    header: "Department",
    cell: ({ row }) => row.original.departmentName ?? "-",
  },
  {
    accessorKey: "positionName",
    header: "Position",
    cell: ({ row }) => row.original.positionName ?? "-",
  },
  {
    header: "Salary",
    cell: ({ row }) => {
      const { salaryMin, salaryMax } = row.original;
      return `${toIdr(salaryMin)} - ${toIdr(salaryMax)}`;
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (row.original.isActive ? "Active" : "Inactive"),
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <Link
        href={{
          pathname: "/vacancy/master/form",
          query: { id: row.original.id },
        }}
      >
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-1" />
          View
        </Button>
      </Link>
    ),
  },
];
