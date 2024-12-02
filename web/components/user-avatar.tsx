"use client";

import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { cn } from "@/lib/utils";
import userPng from "@/public/user.png";

interface Props {
  avatar: string;
  className?: string;
  pendant?: string;
  size?: number;
}

export function UserAvatar({ avatar, pendant, className, size = 32 }: Props) {
  return (
    <div
      className={cn("relative flex shrink-0 outline-none ring-0", className)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <Avatar className="rounded-full size-full">
        <AvatarImage src={avatar} alt="avatar" />
        <AvatarFallback>
          <Image
            src={userPng}
            alt="avatar"
            className="object-cover"
            width={size}
            height={size}
          />
        </AvatarFallback>
      </Avatar>
      {pendant ? (
        <Avatar
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "calc((100% - 2px) * 1.3)",
            height: "calc((100% - 2px) * 1.3)",
          }}
        >
          <AvatarImage src={pendant} alt={"pendant"} />
        </Avatar>
      ) : null}
    </div>
  );
}
