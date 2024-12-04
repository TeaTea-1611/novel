"use client";

import { Icons } from "@/components/icons";
// import { CommandMenu } from "@/components/menu-search";
import { ModeToggle } from "@/components/mode-toggle";
// import { UserButton } from "@/components/user-button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MainNav } from "./main-nav";
import { UserButton } from "./user-button";

export const MainHeader = () => {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full duration-300 border-b border-border/40 shrink-0 items-center gap-2 md:gap-4 ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border backdrop-blur",
        hidden && "-translate-y-full",
      )}
    >
      <div className="flex h-16 items-center justify-between w-full px-4 lg:px-10 gap-2 md:gap-4">
        <div className="flex items-center gap-2 md:gap-4 flex-1">
          <MainNav />
          <Separator orientation="vertical" className="h-4 hidden md:block" />
          <Link
            href="/"
            className={`relative z-20 hidden md:flex items-center text-lg font-medium text-primary leading-tight`}
          >
            <Icons.logo className="size-6 text-primary mr-2" />
            {siteConfig.name}
          </Link>
        </div>
        {/* <CommandMenu /> */}
        <Separator orientation="vertical" className="h-4 hidden md:block" />
        <div className="flex items-center space-x-2 md:space-x-4">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  );
};
