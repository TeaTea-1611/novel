"use client";

import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import NumberTicker from "@workspace/ui/components/number-ticker";
import { FlameIcon } from "lucide-react";

export function CurrentStreakButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <span className="sr-only">Current streak</span>
          <FlameIcon className="size-6 stroke-[4] text-pink-600 mr-2" />
          <NumberTicker className="text-pink-600" value={0} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
