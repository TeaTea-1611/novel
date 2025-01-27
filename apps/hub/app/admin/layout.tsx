import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Header } from "@/components/layout/header";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { ThemeSwitch } from "@/components/theme-switch";
import { SidebarProvider } from "@workspace/ui/components/sidebar";
import { cn } from "@workspace/ui/lib/utils";
import { cookies } from "next/headers";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value !== "false";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AdminSidebar />
      <div
        id="content"
        className={cn(
          "max-w-full w-full ml-auto",
          "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
          "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
          "transition-[width] ease-linear duration-200",
          "h-svh flex flex-col",
          "group-data-[scroll-locked=1]/body:h-full",
          "group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh",
        )}
      >
        <Header fixed>
          <div></div>
          <div className="flex items-center ml-auto space-x-4">
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>
        {children}
      </div>
    </SidebarProvider>
  );
}
