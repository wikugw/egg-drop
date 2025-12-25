"use client";

import { ThemeToggler } from "@/components/theme/theme-toggler";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";

import { RootState } from "@/src/store";
import { ChevronUp, User2 } from "lucide-react";
import { useSelector } from "react-redux";
import { LogoutButton } from "./LogoutButton";

export default function FooterDropdownMenu() {
  const employee = useSelector((state: RootState) => state.employee.data);

  return (
    <DropdownMenu>
      <div className="flex flex-row gap-x-1 items-center">
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton>
            <User2 /> {employee.email}
            <ChevronUp className="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <ThemeToggler />
      </div>
      <DropdownMenuContent
        side="top"
        className="w-[--radix-popper-anchor-width]"
      >
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
