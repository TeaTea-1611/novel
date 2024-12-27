"use client";

import { settingsSidebarNav } from "@/config/nav";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from "@workspace/ui/components/sidebar";
import Link from "next/link";
import { Fragment } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="max-w-screen-lg mx-auto gap-4 flex-col md:flex-row">
      <Sidebar
        variant="sidebar"
        collapsible="none"
        className="rounded-lg w-full md:w-72"
      >
        <SidebarContent>
          {settingsSidebarNav.map((item, i) => (
            <Fragment key={i}>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.map(({ title, href, icon: Icon }) => (
                      <SidebarMenuItem key={href}>
                        <SidebarMenuButton asChild>
                          <Link href={href}>
                            <Icon />
                            <span>{title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              {settingsSidebarNav.length !== i + 1 && <SidebarSeparator />}
            </Fragment>
          ))}
        </SidebarContent>
      </Sidebar>
      <div className="flex-1">{children}</div>
    </SidebarProvider>
  );
}
