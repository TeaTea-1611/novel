"use client";

import * as React from "react";
import { userNav } from "@/config/nav";
import { useFullQuery, useLogoutMutation } from "@/apollo-client/__generated";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import { Skeleton } from "@workspace/ui/components/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { LogIn, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";
import { toast } from "sonner";
import { UserAvatar } from "./user-avatar";
import { VisuallyHidden } from "./visually-hidden";
import { accessTokenVar } from "@/apollo-client/vars/access-token-var";
import { Button, buttonVariants } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export function UserButton() {
  const { data, loading, client } = useFullQuery();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const [logout, { loading: logoutLoading }] = useLogoutMutation({
    onError(error) {
      toast.error(error.message);
    },
    onCompleted(data) {
      if (data.logout) {
        client.cache.modify({
          fields: {
            me() {
              return null;
            },
          },
        });
        accessTokenVar(null);
      }
    },
  });

  if (loading) {
    return <Skeleton className="rounded-full size-8" />;
  }

  if (!data?.me) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={`/login?redirect-to=${encodeURIComponent(pathname)}`}
            className={buttonVariants({
              variant: "ghost",
              className: "!size-8",
            })}
          >
            <LogIn className="size-4" />
            <span className="sr-only">Login</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="end">
          <p>Đăng nhập</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button type="button">
          <UserAvatar avatar={data.me.avatar} />
        </button>
      </SheetTrigger>
      <SheetContent className="p-0 rounded-tl-lg rounded-bl-lg">
        <SheetClose
          className={cn(
            "absolute top-1 right-1 z-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 size-5 flex items-center justify-center rounded-full hover:backdrop-blur-sm",
          )}
        >
          <X className="size-3" />
          <span className="sr-only">Close</span>
        </SheetClose>
        <SheetHeader className="relative">
          <div className="flex flex-col">
            <div className="relative">
              <div className="absolute inset-0 overflow-hidden -z-10 rounded-l-xl bg-accent">
                {!!data.me.avatarCover && (
                  <UserAvatar
                    avatar={data.me.avatarCover}
                    className="size-full rounded-r-none [&>img]:rounded-r-none"
                  />
                )}
              </div>
              <div className="p-0.5 shadow-md size-28 rounded-xl bg-background">
                <UserAvatar avatar={data.me.avatar} className="size-full" />
              </div>
            </div>
            <div className="grid flex-1 p-4 ml-2 leading-tight text-left">
              <span className="font-semibold truncate">{data.me.nickname}</span>
              <span className="text-xs truncate text-muted-foreground">
                {data.me.email}
              </span>
              <span className="text-xs truncate text-muted-foreground">
                Đã tham gia vào{" "}
                {format(new Date(data.me.createdAt), "MM 'năm' yyyy", {
                  locale: vi,
                })}
              </span>
            </div>
          </div>
          <VisuallyHidden>
            <SheetTitle />
            <SheetDescription />
          </VisuallyHidden>
        </SheetHeader>
        <ul className="p-4 list-none">
          {userNav.map((item, i) => (
            <Fragment key={i}>
              {item.map(({ title, href, icon: Icon }) => (
                <li key={title}>
                  <Link
                    href={href}
                    className={
                      "flex w-full h-8 items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                    }
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <Icon className="size-4" />
                    {title}
                  </Link>
                </li>
              ))}
              <li className="my-2 border-b" />
            </Fragment>
          ))}
          <li>
            <Button
              variant={"outline"}
              onClick={() => {
                setOpen(false);
                logout();
              }}
              className="w-full"
              disabled={logoutLoading}
            >
              Đăng xuất
            </Button>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
}
