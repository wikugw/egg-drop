"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ListHeader() {
  return (
    <Button>
      <Link href="/vacancy/create">Create Vacancy</Link>
    </Button>
  );
}
