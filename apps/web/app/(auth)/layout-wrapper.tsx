"use client";

import { Icons } from "@workspace/ui/components/icons";
import { ModeToggle } from "@/components/mode-toggle";
import { siteConfig } from "@/config/site";
import { ginto } from "@/styles/fonts";
import { buttonVariants } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";
import React from "react";

export const LayoutWrapper = ({
  children,
  backButtonLabel,
  backButtonHref,
}: {
  children: React.ReactNode;
  backButtonLabel: string;
  backButtonHref: string;
}) => {
  return (
    <>
      <header className="flex items-center justify-between max-w-screen-lg mx-auto h-14 px-4 lg:px-10">
        <Link
          href="/"
          className={`relative z-20 flex items-center text-lg font-medium text-primary leading-tight ${ginto.className}`}
        >
          <Icons.logo className="size-6 text-primary mr-2" />
          {siteConfig.name}
        </Link>
        <div className="flex items-center space-x-2">
          <ModeToggle />
          <Link
            href={backButtonHref}
            className={cn(buttonVariants({ variant: "linkHover2" }))}
          >
            {backButtonLabel}
          </Link>
        </div>
      </header>
      <div className="max-w-screen-lg min-h-[calc(100svh-7rem)] mx-auto px-2 lg:px-4 pt-20">
        {children}
      </div>
      <footer className="max-w-screen-lg mx-auto h-14 px-2 lg:px-4 flex flex-col items-center justify-center">
        <div className="flex items-center shrink-0 mx-2">
          <Icons.logo className="size-6 text-primary mr-2" />
          <span>© 2024 {siteConfig.name}.</span>
        </div>
      </footer>
      <div className="fixed inset-0 -z-50 pointer-events-none">
        <div className="absolute size-full bg-gradient-to-b from-gradient-from to-gradient-to"></div>
        <div className="absolute w-full h-full bg-[url('/mask-image.svg')] bg-repeat"></div>
      </div>
    </>
  );
};
