"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { createTranslator, localeFromPath } from "@/lib/i18n";
import { TripyaiChat } from "@/components/tripyai-chat";

export function TripyaiLauncher() {
  const t = createTranslator(localeFromPath(usePathname()));
  const [open, setOpen] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(true);

  return <div className="tripyai-launcher">
    {open && <div className="tripyai-launcher-panel">
      <TripyaiChat />
    </div>}
    {!open && bubbleVisible && <div className="tripyai-bubble" role="note">
      <p>{t("chat.askLabel")}</p>
      <button type="button" className="tripyai-bubble-close" aria-label="Close" onClick={() => setBubbleVisible(false)}>×</button>
    </div>}
    <button type="button" className="tripyai-launcher-button" aria-label={t("chat.aria")} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="4" y="9" width="2.4" height="6" rx="1.2" />
        <rect x="8.2" y="6" width="2.4" height="12" rx="1.2" />
        <rect x="12.4" y="3.5" width="2.4" height="17" rx="1.2" />
        <rect x="16.6" y="7" width="2.4" height="10" rx="1.2" />
      </svg>
    </button>
  </div>;
}
