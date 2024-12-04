"use client";

import { useFullQuery } from "@/apollo-client/__generated";
import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { MagicBackButton } from "@/components/ui/magic-back-button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserButton } from "@/components/user-button";
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
        <header className="sticky top-0 z-50 flex items-center px-3 duration-300 ease-linear h-14 shrink-0 backdrop-blur">
          <div id="header-left" className="flex items-center flex-1 gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4 mr-2" />
            <MagicBackButton className="rounded-md size-7" />
            <Separator orientation="vertical" className="h-4" />
            <ModeToggle />
          </div>
          <div className="flex items-center ml-auto gap-x-2">
            <UserButton />
          </div>
        </header>
        <div className="w-full p-2 lg:p-4">{children}</div>
        <div className="fixed inset-0 pointer-events-none -z-50">
          <div className="absolute size-full bg-gradient-to-b from-gradient-from to-gradient-to"></div>
          <div className="absolute w-full h-full bg-[url('/mask-image.svg')] bg-repeat"></div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
