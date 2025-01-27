"use client";

import {
  useFullQuery,
  useLogoutMutation,
  UserRole,
} from "@/apollo-client/__generated";
import { accessTokenVar } from "@/apollo-client/vars/access-token-var";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Skeleton } from "@workspace/ui/components/skeleton";
import Link from "next/link";

import { toast } from "sonner";

export function ProfileDropdown() {
  const { data, loading, client } = useFullQuery();

  const [logout] = useLogoutMutation({
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

  if (loading || !data?.me) {
    return <Skeleton className="size-8 rounded-lg" />;
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative size-8">
          <Avatar className="size-8 rounded-lg">
            <AvatarImage
              src={data.me.avatar}
              alt={data.me.nickname}
              className="rounded-lg"
            />
            <AvatarFallback className="rounded-lg">
              {data.me.nickname.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {data.me.nickname}
            </p>
            <p className="text-muted-foreground text-xs leading-none">
              {data.me.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/settings">Cài đặt</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/invoices">Hóa đơn</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/help-center">Hỗ trợ</Link>
          </DropdownMenuItem>
          {data.me.role === UserRole.Admin && (
            <DropdownMenuItem asChild>
              <Link href="/admin">Quản trị</Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            logout();
          }}
        >
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
