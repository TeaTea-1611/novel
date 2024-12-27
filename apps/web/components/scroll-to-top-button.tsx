"use client";

import { useShowScrollToTopButton } from "@/hooks/use-to-top-button";
import { Button } from "@workspace/ui/components/button";
import { ChevronUp } from "lucide-react";

export function ScrollToTopButton() {
  const showButton = useShowScrollToTopButton();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    showButton && (
      <Button
        variant={"outline"}
        size={"icon"}
        onClick={scrollToTop}
        className="fixed bottom-6 right-6"
      >
        <ChevronUp className="size-4" />
      </Button>
    )
  );
}
