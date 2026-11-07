"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
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
    const subject = encodeURIComponent(`Piolian contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:hello@piolian.com?subject=${subject}&body=${body}`;
    setSent(true);
    setLoading(false);
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <input name="name" placeholder="Your name" aria-label="Your name" required />
      <input name="email" type="email" placeholder="Email address" aria-label="Email address" required />
      <textarea name="message" placeholder="How can we help?" aria-label="Message" required />
      <button type="submit" disabled={loading}>{loading ? "Opening mail…" : "Send message"}</button>
      {sent ? <p className="profile-message" aria-live="polite">Your email app should open with the message ready to send.</p> : null}
    </form>
  );
}
