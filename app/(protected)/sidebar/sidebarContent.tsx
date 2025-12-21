"use client";

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useEmployeeDetail } from "@/hooks/modules/employee/use-employee-detail";
import { USER_EMAIL } from "@/src/constant/local-storage";
import { getFromLocalStorage } from "@/src/helper/local-storage";
import { RootState } from "@/src/store";
import { setEmployee } from "@/src/store/slices/employee-slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppSidebarFooter } from "./sidebarFooter";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Vacancy",
    url: "/vacancy/active/list",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const employee = useSelector((state: RootState) => state.employee.data);
  const dispatch = useDispatch();

  const { data } = useEmployeeDetail(getFromLocalStorage(USER_EMAIL) ?? "");

  useEffect(() => {
    if (!employee.email && data) {
      dispatch(setEmployee(data));
    }
  }, [employee, data, dispatch]);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Egg Drop</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <AppSidebarFooter />
    </Sidebar>
  );
}
