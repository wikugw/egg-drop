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

  if (!session) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
