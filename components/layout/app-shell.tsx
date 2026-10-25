import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { TopHeader } from "@/components/layout/top-header";
import { PageTransition } from "@/components/layout/page-transition";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen w-full bg-white">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0 bg-white">
        <TopHeader />
        <main className="flex-1 w-full flex flex-col bg-white">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}

