"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const COOKIE_NOTICE_KEY = "poilian-cookie-notice-dismissed";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(window.localStorage.getItem(COOKIE_NOTICE_KEY) !== "true"), []);
  const dismiss = () => { window.localStorage.setItem(COOKIE_NOTICE_KEY, "true"); setIsVisible(false); };
  if (!isVisible) return null;
  return <aside className="cookie-banner" aria-label="Cookie notice"><div className="cookie-banner-top"><span className="cookie-language" aria-label="Language">⌘ <span>English</span><i aria-hidden="true">⌄</i></span><button className="cookie-close" type="button" onClick={dismiss} aria-label="Dismiss cookie notice">×</button></div><p>We use cookies and similar technologies on this site to enable essential site functionality and to support analytics, personalization, and marketing, including sharing data with third-party providers. By continuing to browse, you accept the use of non-essential cookies. For more information, see our <Link href="/privacy">Privacy Policy</Link>.</p></aside>;
}
