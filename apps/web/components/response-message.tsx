"use client";

import { cn } from "@workspace/ui/lib/utils";
import { AlertCircle, CheckCircle } from "lucide-react";

interface Props {
  success?: boolean;
  message?: string | null;
}

export const ResponseMessage = ({ success, message }: Props) => {
  if (!message) return null;

  return (
    <div
      className={cn(
        "rounded-md px-3 py-2 flex gap-x-2 text-sm",
        success
          ? "bg-green-500/15 text-green-500"
          : "bg-destructive/15 text-destructive",
      )}
    >
      {success ? (
        <CheckCircle className="size-5" />
      ) : (
        <AlertCircle className="size-5" />
      )}
      <p className="whitespace-pre-wrap">{message}</p>
    </div>
  );
};
