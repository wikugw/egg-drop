"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ListHeader() {
  return (
    <div className="flex flex-row">
      <Button>
        <Link href="/vacancy/master/form">Create Vacancy</Link>
      </Button>
    </div>
  );
}
