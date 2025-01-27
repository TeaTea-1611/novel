"use client";

import { Separator } from "@workspace/ui/components/separator";
import SidebarNav from "./sidebar-nav";
import { BellIcon, UserIcon } from "lucide-react";
import { Main } from "@/components/layout/main";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Main fixed>
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Cài đặt
        </h1>
        <p className="text-muted-foreground">
          Quản lý cài đặt tài khoản của bạn.
        </p>
      </div>
      <Separator className="my-4 lg:my-6" />
      <div className="flex flex-col flex-1 space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="top-0 lg:sticky lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex w-full p-1 pr-4 overflow-y-hidden">{children}</div>
      </div>
    </Main>
  );
}

const sidebarNavItems = [
  {
    title: "Hồ sơ",
    icon: <UserIcon />,
    href: "/settings",
  },
  {
    title: "Thông báo",
    icon: <BellIcon />,
    href: "/settings/notifications",
  },
];
