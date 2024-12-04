"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { LoaderIcon, SaveIcon } from "lucide-react";

interface Props {
  initialValue: string;
  onSave: (value: string) => void;
  loading: boolean;
}

export function DataTableEditInput({ initialValue, onSave, loading }: Props) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div className="relative">
      <input
        disabled={loading}
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
        className="px-1 py-2 -mx-1 bg-transparent rounded-md outline-none size-full focus:ring-1"
      />
      {initialValue !== value && (
        <Button
          variant={"ghost"}
          size={"icon"}
          className="absolute -translate-y-1/2 top-1/2 right-2 size-7"
          onClick={() => onSave(value)}
        >
          {loading ? (
            <LoaderIcon className="size-4 animate-spin" />
          ) : (
            <SaveIcon className="size-4" />
          )}
        </Button>
      )}
    </div>
  );
}
