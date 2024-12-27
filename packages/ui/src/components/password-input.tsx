"use client";
import { cn } from "@workspace/ui/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import * as React from "react";
import { Button } from "@workspace/ui/components/button";

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
  }
>(({ className, label, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const disabled =
    props.value === "" || props.value === undefined || props.disabled;

  return (
    <div className={"relative"}>
      <input
        ref={ref}
        type={showPassword ? "text" : "password"}
        className={cn(
          "peer pl-2 pr-10 pb-2 pt-6 block h-11 w-full rounded-md bg-background shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 hide-password-toggle border",
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
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={disabled}
      >
        {showPassword && !disabled ? (
          <Eye className="size-4" aria-hidden="true" />
        ) : (
          <EyeOff className="size-4" aria-hidden="true" />
        )}
        <span className="sr-only">
          {showPassword ? "Hide password" : "Show password"}
        </span>
      </Button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
