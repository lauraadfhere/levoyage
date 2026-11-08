"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const locales = ["en", "fr", "ar"];

export function DocumentDirection() {
  const pathname = usePathname();

  useEffect(() => {
    const locale = pathname.split("/")[1];
    const active = locales.includes(locale) ? locale : "en";
    document.documentElement.lang = active;
    document.documentElement.dir = active === "ar" ? "rtl" : "ltr";
  }, [pathname]);

  return null;
}
