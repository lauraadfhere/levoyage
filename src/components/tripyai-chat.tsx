"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { usePathname } from "next/navigation";
import { createTranslator, localeFromPath } from "@/lib/i18n";
type Match = { name: string; wilaya?: string; type: string; href: string };
type Message = { role: "assistant" | "user"; text: string; matches?: Match[] };
export function TripyaiChat() {
  const t = createTranslator(localeFromPath(usePathname()));
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", text: t("chat.greeting") }]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = value.trim();
    if (!question || loading) return;

    const history = messages
      .slice(-8)
      .map(({ role, text }) => ({ role, content: text.slice(0, 1000) }));
    setValue("");
    setMessages((current) => [...current, { role: "user", text: question }]);
    setLoading(true);
    try {
      const response = await fetch("/api/tripyai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, history }),
      });
      const data = await response.json() as { answer?: string; matches?: Match[]; error?: string };
      setMessages((current) => [...current, {
        role: "assistant",
        text: data.answer || data.error || t("chat.retry"),
        matches: data.matches,
      }]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", text: t("chat.error") }]);
    } finally {
      setLoading(false);
    }
  }

  return <section className="tripyai-chat" aria-label={t("chat.aria")}>
    <div className="tripyai-messages" aria-live="polite">
      {messages.map((message, index) => <article className={`tripyai-message ${message.role}`} key={`${message.role}-${index}`}>
        <p>{message.text}</p>
        {message.matches && <div className="tripyai-matches">{message.matches.map((match) => <Link href={match.href} key={`${match.href}-${match.name}`}>
          <strong>{match.name}</strong><small>{match.wilaya || match.type}</small>
        </Link>)}</div>}
      </article>)}
      {loading && <article className="tripyai-message assistant"><p>{t("chat.checking")}</p></article>}
    </div>
    <form onSubmit={send}>
      <label><span className="sr-only">{t("chat.askLabel")}</span><input value={value} onChange={(event) => setValue(event.target.value)} placeholder={t("chat.placeholder")} /></label>
      <button type="submit" disabled={loading || !value.trim()}>{t("chat.send")}</button>
    </form>
  </section>;
}
