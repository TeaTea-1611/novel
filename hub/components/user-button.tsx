"use client";

import { userNav } from "@/config/nav";
import { useFullQuery, useLogoutMutation } from "@/apollo-client/__generated";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LogIn, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";
import { toast } from "sonner";
import { VisuallyHidden } from "./visually-hidden";
import { UserAvatar } from "./avatars";

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
      }
    },
  });

  if (loading) {
    return <Skeleton className="size-8 rounded-full" />;
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
          <UserAvatar
            avatar={data.me.avatar}
            pendant="https://fastcdn.hoyoverse.com/static-resource-v2/2024/04/10/8c3f8f0171bce9b2571696b2202231f9_6804457412128473879.webp?x-oss-process=image/resize,m_fixed,h_318,w_318"
          />
        </button>
      </SheetTrigger>
      <SheetContent className="p-4">
        <SheetHeader>
          <div className="flex items-center">
            <div className="flex items-center flex-1 text-left">
              <UserAvatar
                avatar={data.me.avatar}
                pendant="https://fastcdn.hoyoverse.com/static-resource-v2/2024/04/10/8c3f8f0171bce9b2571696b2202231f9_6804457412128473879.webp?x-oss-process=image/resize,m_fixed,h_318,w_318"
              />
              <div className="grid flex-1 text-left leading-tight ml-2">
                <span className="truncate font-semibold text-sm">
                  {data.me.nickname}
                </span>
                <span className="truncate text-xs">{data.me.email}</span>
              </div>
            </div>
            <SheetClose
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "size-8 p-2",
                }),
              )}
            >
              <X className="size-4" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </div>
          <VisuallyHidden>
            <SheetTitle />
            <SheetDescription />
          </VisuallyHidden>
        </SheetHeader>
        <ul className="list-none py-4">
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
              <li className="border-b my-2" />
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
