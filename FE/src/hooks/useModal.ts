import { usePathname } from "next/navigation";
import { useState, useCallback, useEffect, MouseEvent } from "react";

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const openToggle = useCallback((e?: MouseEvent<HTMLElement>) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setIsOpen(true);
  }, []);

  const closeToggle = useCallback((e?: MouseEvent<HTMLElement>) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setIsOpen(false);
    document.body.style.overflow = "auto";
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    if (setIsOpen) {
      setIsOpen(false);
    }
  }, [pathname]);

  return {
    isOpen,
    openToggle,
    closeToggle,
  };
}
