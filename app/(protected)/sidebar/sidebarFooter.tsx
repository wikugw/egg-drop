import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FooterDropdownMenu } from "./FooterDropdownMenu";

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
