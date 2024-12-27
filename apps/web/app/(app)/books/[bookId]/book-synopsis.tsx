"use client";

import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { useRef, useState } from "react";

interface Props {
  synopsis: string;
}

export const BookSynopsis = ({ synopsis }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="space-y-3 ">
      <div className="flex items-center justify-between border-b">
        <h3 className="pb-2 text-xl font-semibold tracking-tight transition-colors">
          Tóm tắt truyện
        </h3>
      </div>
      <p
        className={cn("text-base text-muted-foreground", {
          "line-clamp-[12]": isCollapsed,
        })}
        dangerouslySetInnerHTML={{
          __html: synopsis.replace(/\./g, ".<br/>").replace(/\n/g, "<br />"),
        }}
      ></p>
      <Button
        variant="link"
        className="mt-2 text-sm"
        onClick={() => {
          setIsCollapsed(!isCollapsed);
          setTimeout(() => {
            containerRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "end",
            });
          }, 0);
        }}
      >
        {isCollapsed ? "Hiển thị thêm" : "Ẩn bớt"}
      </Button>
    </div>
  );
};
