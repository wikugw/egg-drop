"use client";

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
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { sidebarItems } from "./sidebar-config";

const isActiveRoute = (pathname: string, url?: string) =>
  !!url && (pathname === url || pathname.startsWith(`${url}/`));

const getActiveParent = (pathname: string) =>
  sidebarItems.find((item) =>
    item.children?.some((child) => isActiveRoute(pathname, child.url))
  )?.title ?? null;

export function AppSidebar() {
  const pathname = usePathname();

  // hanya untuk manual toggle
  const [manualOpen, setManualOpen] = useState<string | null>(null);

  // 🔥 derived value (NO state, NO effect)
  const autoOpen = getActiveParent(pathname);

  // prioritas: manual > auto
  const openMenu = manualOpen ?? autoOpen;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Egg Drop</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isParentActive = item.children?.some((child) =>
                  isActiveRoute(pathname, child.url)
                );

                const isOpen = openMenu === item.title;

                // ===== PARENT =====
                if (item.children) {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={isParentActive}
                        onClick={() =>
                          setManualOpen(isOpen ? null : item.title)
                        }
                      >
                        {Icon && <Icon />}
                        <span>{item.title}</span>
                        <ChevronDown
                          className={`ml-auto transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </SidebarMenuButton>

                      {isOpen && (
                        <div className="ml-6 mt-1 flex flex-col gap-1">
                          {item.children.map((child) => (
                            <SidebarMenuButton
                              key={child.title}
                              asChild
                              size="sm"
                              isActive={isActiveRoute(pathname, child.url)}
                            >
                              <a href={child.url}>
                                <span>{child.title}</span>
                              </a>
                            </SidebarMenuButton>
                          ))}
                        </div>
                      )}
                    </SidebarMenuItem>
                  );
                }

                // ===== SINGLE =====
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActiveRoute(pathname, item.url)}
                    >
                      <a href={item.url}>
                        {Icon && <Icon />}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
