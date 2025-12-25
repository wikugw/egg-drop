import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import dynamic from "next/dynamic";

const FooterDropdownMenu = dynamic(() => import("./FooterDropdownMenu"), {
  ssr: false,
});

export function AppSidebarFooter() {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <FooterDropdownMenu />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
