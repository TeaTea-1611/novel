"use client";

import { useFullQuery } from "@/apollo-client/generated";
import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data, loading } = useFullQuery();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !data?.me) {
      // router.push("http://localhost:4000/graphql");
    }
  }, [data, loading, router]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-transparent">
        <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center gap-2 bg-background">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    Project Management & Task Tracking
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
          </div>
          <div className="ml-auto px-3">
            <ModeToggle />
          </div>
        </header>
        <div className="w-full p-2 lg:p-4">{children}</div>
        <div className="fixed inset-0 -z-50 pointer-events-none">
          <div className="absolute size-full bg-gradient-to-b from-gradient-from to-gradient-to"></div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
