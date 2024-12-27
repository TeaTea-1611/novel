"use client";

import { Icons } from "@/components/icons";
import { mainNav } from "@/config/nav";
import { siteConfig } from "@/config/site";
import { Button, buttonVariants } from "@workspace/ui/components/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import { cn } from "@workspace/ui/lib/utils";
import { ChevronRight, PanelLeft, X } from "lucide-react";
import Link from "next/link";
import { VisuallyHidden } from "./visually-hidden";

export const MainNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="size-8 px-0">
          <PanelLeft className="size-4" />
          <span className="sr-only">Toggle navigation</span>
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0">
        <SheetHeader className="relative px-4 pt-4">
          <SheetClose
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "size-8 p-2 !absolute top-2 right-2",
              }),
            )}
          >
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </SheetClose>
          <Link
            href={"/"}
            className={`flex items-center text-lg text-primary leading-tight`}
          >
            <Icons.logo className="size-6 text-primary mr-2" />
            {siteConfig.name}
          </Link>
          <VisuallyHidden>
            <SheetTitle />
            <SheetDescription />
          </VisuallyHidden>
        </SheetHeader>
        <nav className="p-4">
          <ul className="list-none text-sm">
            {mainNav.map((item) => (
              <Collapsible key={item.href} asChild defaultOpen={true}>
                <li className="group/menu-item relative">
                  <Link
                    href={item.href}
                    className={
                      "flex w-full h-8 items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none hover:bg-accent hover:text-accent-foreground"
                    }
                  >
                    <item.icon className="size-4" />
                    {item.title}
                  </Link>
                  {item.items?.length ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <button
                          className={cn(
                            "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-foreground outline-none ring-ring transition-transform hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
                            // Increases the hit area of the button on mobile.
                            "after:absolute after:-inset-2 after:md:hidden",
                            "peer-data-[size=sm]/menu-button:top-1",
                            "peer-data-[size=default]/menu-button:top-1.5",
                            "peer-data-[size=lg]/menu-button:top-2.5",
                            "group-data-[collapsible=icon]:hidden",

                            "data-[state=open]:rotate-90",
                          )}
                        >
                          <ChevronRight />
                          <span className="sr-only">Toggle</span>
                        </button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <ul
                          className={cn(
                            "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-border px-2.5 py-0.5",
                            "group-data-[collapsible=icon]:hidden",
                          )}
                        >
                          {item.items?.map((subItem) => (
                            <li key={subItem.title}>
                              <Link
                                href={subItem.href}
                                className={cn(
                                  "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-foreground outline-none ring-ring hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 active:bg-accent active:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-accent-foreground",
                                  "data-[active=true]:bg-accent data-[active=true]:text-accent-foreground",
                                  "group-data-[collapsible=icon]:hidden",
                                )}
                              >
                                <span>{subItem.title}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </CollapsibleContent>
                    </>
                  ) : null}
                </li>
              </Collapsible>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
