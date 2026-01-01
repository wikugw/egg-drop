"use client";

import { Button } from "@/components/ui/button";
import { toIdr } from "@/src/helper/currency";
import { VacancyActiveResponse } from "@/src/types/modules/vacancy/active/list/reponse";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Eye } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<VacancyActiveResponse>[] = [
  {
    accessorKey: "title",
    header: "Vacancy",
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        <span className="text-foreground">{row.original.title}</span>
        <span className="text-xs text-muted-foreground">
          {row.original.departmentName} · {row.original.positionName}
        </span>
      </div>
    ),
  },

  {
    header: "Salary",
    cell: ({ row }) => {
      const { salaryMin, salaryMax } = row.original;
      return (
        <span>
          {toIdr(salaryMin)} – {toIdr(salaryMax)}
        </span>
      );
    },
  },

  {
    header: "Period",
    cell: ({ row }) => {
      const { startDate, endDate } = row.original;

      return (
        <div className="flex flex-col text-sm">
          <span>{format(new Date(startDate), "dd MMM yyyy")}</span>
          <span className="text-muted-foreground">
            s/d {format(new Date(endDate), "dd MMM yyyy")}
          </span>
        </div>
      );
    },
  },

  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <Link
        href={{
          pathname: "/vacancy/active/form",
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
