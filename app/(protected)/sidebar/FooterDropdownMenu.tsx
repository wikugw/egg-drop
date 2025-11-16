import { ThemeToggler } from "@/components/theme/theme-toggler";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";

import { getSession } from "@/src/lib/auth";
import { ChevronUp, User2 } from "lucide-react";
import { LogoutButton } from "./LogoutButton";

export async function FooterDropdownMenu() {
  const session = await getSession();
  return (
    <DropdownMenu>
      <div className="flex flex-row gap-x-1 items-center">
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton>
            <User2 /> {session?.email}
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
