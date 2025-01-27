"use client";

import {
  Command,
  FileIcon,
  LibraryBigIcon,
  LifeBuoyIcon,
  SendIcon,
} from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import { CreatorNavMain } from "./creator-nav-main";
import { CreatorNavSecondary } from "./creator-nav-secondary";

const data = {
  navMain: [
    {
      title: "Truyện",
      url: "/creator/books",
      icon: LibraryBigIcon,
      isActive: true,
      items: [
        {
          title: "Đã đăng",
          url: "/creator/books",
        },
        {
          title: "Thêm",
          url: "/creator/books/create",
        },
      ],
    },
    {
      title: "Bản thảo",
      url: "/creator/drafts",
      icon: FileIcon,
      items: [
        {
          title: "Danh sách",
          url: "/creator/drafts",
        },
        {
          title: "Thêm",
          url: "/creator/drafts/creator",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Hỗ trợ",
      url: "/support",
      icon: LifeBuoyIcon,
    },
    {
      title: "Phản hồi",
      url: "/feedback",
      icon: SendIcon,
    },
  ],
};

export function CreatorSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <CreatorNavMain items={data.navMain} />
        <CreatorNavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
    </Sidebar>
  );
}
