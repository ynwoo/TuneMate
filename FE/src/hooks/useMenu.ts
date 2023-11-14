import { usePathname } from "next/navigation";
import { useState, useCallback, useEffect } from "react";

export default function useMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const openMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = "auto";
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (setIsMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [pathname]);

  return {
    isMenuOpen,
    openMenu,
    closeMenu,
  };
}
