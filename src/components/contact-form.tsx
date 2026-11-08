"use client";

import { FormEvent, useState } from "react";
import { usePathname } from "next/navigation";
import { createTranslator, localeFromPath } from "@/lib/i18n";

export function ContactForm() {
  const t = createTranslator(localeFromPath(usePathname()));
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();
    if (!name || !email || !message) return;
    setLoading(true);
    const subject = encodeURIComponent(`Le Voyage contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:hello@piolian.com?subject=${subject}&body=${body}`;
    setSent(true);
    setLoading(false);
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <input name="name" placeholder={t("contact.name")} aria-label={t("contact.name")} required />
      <input name="email" type="email" placeholder={t("contact.email")} aria-label={t("contact.email")} required />
      <textarea name="message" placeholder={t("contact.message")} aria-label={t("contact.messageAria")} required />
      <button type="submit" disabled={loading}>{loading ? t("contact.opening") : t("contact.send")}</button>
      {sent ? <p className="profile-message" aria-live="polite">{t("contact.sent")}</p> : null}
    </form>
  );
}
