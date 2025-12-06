import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getSession } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import { AppSidebar } from "./sidebar/sidebarContent"; // pindahkan SidebarContent ke file terpisah client

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) redirect("/login");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar fixed width */}
        <AppSidebar />

        {/* Main akan otomatis ambil sisa ruang */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex flex-row items-center gap-3">
            <SidebarTrigger />
            {/* breadcrumb */}
          </div>

          <div className="mt-2">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
