"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { createTranslator, localeFromPath } from "@/lib/i18n";
import { TripyaiChat } from "@/components/tripyai-chat";

export function TripyaiLauncher() {
  const t = createTranslator(localeFromPath(usePathname()));
  const [open, setOpen] = useState(false);

  return <div className="tripyai-launcher">
    {open && <div className="tripyai-launcher-panel">
      <TripyaiChat />
    </div>}
    <button type="button" className="tripyai-launcher-button" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
      <span aria-hidden="true">✦</span>
      <span>{t("chat.aria")}</span>
    </button>
  </div>;
}
