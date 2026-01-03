import { ThemeToggler } from "@/components/theme/theme-toggler";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* NAVBAR */}
      <header className="h-14 border-b px-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Egg Drop</h1>
        <ThemeToggler />
      </header>

      {/* PAGE CONTENT */}
      <main className="flex-1 p-4">
        <div className="mx-auto w-full max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
