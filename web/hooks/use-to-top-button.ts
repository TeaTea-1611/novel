import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

const showScrollToTopButtonAtom = atom(false);

export function useShowScrollToTopButton() {
  const [showButton, setShowButton] = useAtom(showScrollToTopButtonAtom);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY.current && currentScrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setShowButton]);

  return showButton;
}
