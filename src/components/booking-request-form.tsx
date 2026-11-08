"use client";

import { FormEvent, useState } from "react";
import { usePathname } from "next/navigation";
import { createTranslator, localeFromPath } from "@/lib/i18n";

export function BookingRequestForm({ propertySlug, propertyName }: { propertySlug: string; propertyName: string }) {
  const t = createTranslator(localeFromPath(usePathname()));
  const [error, setError] = useState(""); const [message, setMessage] = useState(""); const [sending, setSending] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const formElement = event.currentTarget; setError(""); setMessage(""); setSending(true); const form = new FormData(event.currentTarget); const payload = Object.fromEntries(form.entries()); try { const response = await fetch("/api/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, propertySlug }) }); const data = await response.json(); if (!response.ok) throw new Error(data.error || t("booking.error")); setMessage(t("booking.submitted", { ref: data.booking.bookingReference })); formElement.reset(); } catch (cause) { setError(cause instanceof Error ? cause.message : t("booking.error")); } finally { setSending(false); } }
  return <form className="booking-request-form" onSubmit={submit} aria-label={t("booking.aria", { name: propertyName })}>
    <label>{t("booking.checkIn")}<input type="date" name="checkIn" required /></label>
    <label>{t("booking.checkOut")}<input type="date" name="checkOut" required /></label>
    <label>{t("booking.guests")}<input type="number" name="guests" min="1" max="20" defaultValue="2" required /></label>
    <label>{t("booking.yourName")}<input name="guestName" autoComplete="name" required maxLength={120} /></label>
    <label>{t("booking.email")}<input type="email" name="guestEmail" autoComplete="email" required maxLength={200} /></label>
    <label>{t("booking.message")}<textarea name="guestMessage" rows={2} maxLength={1500} placeholder={t("booking.messagePlaceholder")} /></label>
    {error && <p className="form-error" role="alert">{error}</p>}
    {message && <p className="profile-message" role="status">{message}</p>}
    <button type="submit" disabled={sending}>{sending ? t("booking.sending") : t("booking.send")}</button>
    <small>{t("booking.note")}</small>
  </form>;
}
