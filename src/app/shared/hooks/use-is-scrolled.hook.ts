"use client";

import { useEffect, useState } from "react";

export function useIsScrolled(threshold = 0): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > threshold);

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
}
