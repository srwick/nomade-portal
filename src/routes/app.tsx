import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Topbar } from "@/components/topbar";
import { BottomNav } from "@/components/bottom-nav";

export const Route = createFileRoute("/app")({
  beforeLoad: () => {
    if (typeof window !== "undefined" && !localStorage.getItem("nomade_auth")) {
      throw redirect({ to: "/login" });
    }
  },
  component: AppLayout,
});

function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-dvh w-full bg-muted/30">
        <AppSidebar />
        <SidebarInset className="flex-1 min-w-0">
          <Topbar />
          <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6">
            <Outlet />
          </main>
        </SidebarInset>
        <BottomNav />
      </div>
    </SidebarProvider>
  );
}
