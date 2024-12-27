import * as React from "react";
import { cn } from "@workspace/ui/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & {
    label?: string;
  }
>(({ className, label, value, ...props }, ref) => {
  return (
    <div className="relative">
      <textarea
        ref={ref}
        className={cn(
          "peer px-2 pb-2 pt-6 block min-h-16 w-full rounded-md border border-input bg-background shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        value={value}
        placeholder=" "
        {...props}
      />
      {label && (
        <label className="absolute block top-3.5 text-muted-foreground font-bold text-sm left-4 uppercase peer-focus:top-1 peer-focus:left-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:text-xs transition-all duration-300">
          {label}
        </label>
      )}
    </div>
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
