"use client";

import { Icons } from "@workspace/ui/components/icons";
// import { CommandMenu } from "@/components/menu-search";
import { ModeToggle } from "@/components/mode-toggle";
// import { UserButton } from "@/components/user-button";
import { siteConfig } from "@/config/site";
import { cn } from "@workspace/ui/lib/utils";
import { Separator } from "@workspace/ui/components/separator";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MainNav } from "./main-nav";
import { UserButton } from "./user-button";
import { CurrentStreakButton } from "./current-streak-button";

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
      <div className="flex items-center w-full h-16 gap-2 px-4 lg:px-10 md:gap-4">
        <div className="flex items-center flex-1 gap-2 md:gap-4">
          <MainNav />
          <Separator orientation="vertical" className="hidden h-4 md:block" />
          <Link
            href="/"
            className={`relative z-20 hidden md:flex items-center text-lg font-medium text-primary leading-tight`}
          >
            <Icons.logo className="mr-2 size-6 text-primary" />
            {siteConfig.name}
          </Link>
        </div>
        {/* <CommandMenu /> */}
        <ModeToggle />

        <Separator orientation="vertical" className="hidden h-4 md:block" />
        <div className="flex items-center p-0.5 space-x-2 md:space-x-2 bg-primary/10 rounded-xl">
          <CurrentStreakButton />
          <UserButton />
        </div>
      </div>
    </header>
  );
};
