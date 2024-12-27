"use client";
import { cn } from "@workspace/ui/lib/utils";
import { type LucideIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@workspace/ui/components/button";

export interface InputIconProps {
  icon?: LucideIcon;
  onClickIcon?: () => void;
}

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
  } & InputIconProps
>(({ className, label, type, icon: Icon, onClickIcon, ...props }, ref) => {
  return (
    <div className={"relative w-full"}>
      <input
        ref={ref}
        type={type}
        className={cn(
          "peer px-2 pb-2 pt-6 block h-11 w-full rounded-md border border-input bg-background shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          Icon ? "pr-12" : "pr-2",
          className,
        )}
        placeholder=" "
        {...props}
      />
      <label
        className={
          "absolute block top-1/2 text-muted-foreground font-bold text-sm -translate-y-1/2 left-4 uppercase peer-focus:top-1 peer-focus:-translate-y-0 peer-focus:left-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:text-xs transition-all duration-300"
        }
      >
        {label}
      </label>
      {Icon && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 size-11 px-3 py-2 hover:bg-transparent"
          onClick={onClickIcon}
        >
          <Icon className="size-4" />
        </Button>
      )}
    </div>
  );
});

Input.displayName = "Input";

export { Input };
