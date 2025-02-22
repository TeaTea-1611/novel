"use client";

import { buttonVariants } from "@workspace/ui/components/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NotLoggedIn() {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-center flex-col space-y-2">
      <p className="font-medium text-sm text-muted-foreground">
        Bạn chưa đăng nhập.
      </p>
      <Link
        href={`http://localhost:3001/login?redirect-to=${encodeURIComponent(
          `http://localhost:3000${pathname}`,
        )}`}
        className={buttonVariants({ variant: "gooeyRight" })}
      >
        Đăng nhập
      </Link>
    </div>
  );
}
