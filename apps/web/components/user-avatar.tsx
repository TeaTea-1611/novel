"use client";

import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { cn } from "@workspace/ui/lib/utils";
import userPng from "@/public/user.png";

interface Props {
  avatar: string;
  className?: string;
}

export function UserAvatar({ avatar, className }: Props) {
  return (
    <Avatar className={cn("rounded-lg size-8", className)}>
      <AvatarImage src={avatar} alt="avatar" className="rounded-lg size-full" />
      <AvatarFallback className="rounded-lg bg-transparent">
        <Image
          src={userPng}
          alt="avatar"
          className="object-cover rounded-lg"
          width={32}
          height={32}
        />
      </AvatarFallback>
    </Avatar>
  );
}
