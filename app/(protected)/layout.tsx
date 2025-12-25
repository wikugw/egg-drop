import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getSession } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import { EmployeeInitializer } from "./EmployeeInitializer";
import { AppSidebar } from "./sidebar/sidebarContent";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) redirect("/login");

  return (
    <SidebarProvider>
      <EmployeeInitializer>
        <div className="flex min-h-screen w-full">
          <AppSidebar />

          <main className="flex-1 p-6 overflow-auto">
            <div className="flex flex-row items-center gap-3">
              <SidebarTrigger />
            </div>

            <div className="mt-2">{children}</div>
          </main>
        </div>
      </EmployeeInitializer>
    </SidebarProvider>
  );
}
