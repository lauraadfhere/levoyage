"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const demoAccounts = [
  { role: "Traveler", email: "demo.traveler@poilian.test", password: "PoilianTraveler!2026", description: "Trips, saved items and bookings" },
  { role: "Partner", email: "demo.partner@poilian.test", password: "PoilianPartner!2026", description: "Partner profile and tourism business" },
  { role: "Administrator", email: "demo.admin@poilian.test", password: "PoilianAdmin!2026", description: "Platform administration workflows" },
];

export function AuthForm({ mode, locale }: { mode: "login" | "signup"; locale?: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  function useDemo(email: string, password: string) {
    const form = document.querySelector<HTMLFormElement>(".account-form");
    if (!form) return;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement | null;
    const passwordInput = form.elements.namedItem("password") as HTMLInputElement | null;
    if (emailInput) emailInput.value = email;
    if (passwordInput) passwordInput.value = password;
    setDemoOpen(false);
    emailInput?.focus();
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = { email: form.get("email"), password: form.get("password"), ...(mode === "signup" ? { fullName: form.get("fullName") } : {}) };
    try {
      const response = await fetch(`/api/auth/${mode}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json().catch(() => ({ error: "The account service did not respond correctly." }));
      if (!response.ok) return setError(data.error || "Please try again.");
      router.push(locale ? `/${locale}/dashboard` : "/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return <>
    <form className="account-form" onSubmit={submit}>
      {mode === "signup" && <label>Full name<input name="fullName" autoComplete="name" required placeholder="Your full name" /></label>}
      <label>Email address<input type="email" name="email" autoComplete="email" required placeholder="Enter your email address" /></label>
      <label>Password<input type="password" name="password" autoComplete={mode === "login" ? "current-password" : "new-password"} minLength={8} required placeholder="At least 8 characters" /></label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button type="submit" disabled={loading}>{loading ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}</button>
      {mode === "login" && <button type="button" className="demo-access-trigger" onClick={() => setDemoOpen(true)} aria-haspopup="dialog">
        <span className="demo-access-icon" aria-hidden="true">AI</span><span>Demo access</span>
      </button>}
    </form>
    {demoOpen && <div className="demo-access-backdrop" role="presentation" onMouseDown={() => setDemoOpen(false)}>
      <section className="demo-access-dialog" role="dialog" aria-modal="true" aria-labelledby="demo-access-title" onMouseDown={event => event.stopPropagation()}>
        <button type="button" className="demo-access-close" onClick={() => setDemoOpen(false)} aria-label="Close demo access">×</button>
        <span className="demo-access-icon demo-access-icon-large" aria-hidden="true">AI</span>
        <p className="demo-access-eyebrow">MS AII · PROTOTYPE ACCESS</p>
        <h2 id="demo-access-title">Try a demo account</h2>
        <p className="demo-access-intro">Use one of these development accounts to explore the prototype. They are not for production use.</p>
        <div className="demo-account-list">
          {demoAccounts.map(account => <article className="demo-account" key={account.role}>
            <div><strong>{account.role}</strong><p>{account.description}</p></div>
            <dl><div><dt>Email</dt><dd>{account.email}</dd></div><div><dt>Password</dt><dd>{account.password}</dd></div></dl>
            <button type="button" onClick={() => useDemo(account.email, account.password)}>Use this account</button>
          </article>)}
        </div>
      </section>
    </div>}
  </>;
}

type Profile = { id: string; email: string; fullName: string; phone: string; locale: string; bio: string; avatarId: string | null; avatarUrl?: string | null };
export function ProfileForm() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const router = useRouter();
  useEffect(() => {
    fetch("/api/auth/profile")
      .then(async (response) => {
        if (!response.ok) return router.replace("/login");
        const data = await response.json() as Profile;
        setProfile(data);
        setPreview(data.avatarUrl || null);
      })
      .catch(() => router.replace("/login"));
  }, [router]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profile) return;
    setMessage("Saving…");
    try {
      let avatarId = profile.avatarId;
      let avatarUrl = profile.avatarUrl || null;
      if (avatar) {
        const media = new FormData();
        media.set("file", avatar);
        media.set("ownerType", "user");
        media.set("ownerId", profile.id);
        const uploaded = await fetch("/api/media/upload", { method: "POST", body: media });
        const result = await uploaded.json().catch(() => ({ error: "Upload failed." }));
        if (!uploaded.ok) return setMessage(result.error || "Could not upload avatar.");
        avatarId = result.id;
        if (result.objectKey) {
          avatarUrl = `/api/media/${String(result.objectKey).split("/").map(encodeURIComponent).join("/")}`;
          setPreview(avatarUrl);
        }
      }
      const response = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...profile, avatarId }),
      });
      const data = await response.json().catch(() => ({ error: "Could not save profile." }));
      if (response.ok) {
        setProfile({ ...profile, avatarId, avatarUrl });
        setAvatar(null);
        window.dispatchEvent(new Event("account-profile-updated"));
      }
      setMessage(response.ok ? "Profile saved." : data.error || "Could not save profile.");
    } catch {
      setMessage("Network error. Please try again.");
    }
  }
  if (!profile) return <p>Loading your travel profile…</p>;
  const initials = profile.fullName.split(" ").map((word) => word[0]).join("").slice(0, 2);
  return (
    <form className="profile-form" onSubmit={submit}>
      <div className="avatar-preview">{preview ? <img src={preview} alt="" /> : initials}</div>
      <label>Profile photo<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={(event) => setAvatar(event.target.files?.[0] || null)} /></label>
      <p className="avatar-note">JPEG, PNG, WebP or AVIF up to 25 MB. Stored privately in R2.</p>
      <label>Full name<input value={profile.fullName} onChange={(event) => setProfile({ ...profile, fullName: event.target.value })} required /></label>
      <label>Email address<input value={profile.email} disabled /></label>
      <label>Phone number<input value={profile.phone} onChange={(event) => setProfile({ ...profile, phone: event.target.value })} placeholder="Optional" /></label>
      <label>Preferred language<select value={profile.locale} onChange={(event) => setProfile({ ...profile, locale: event.target.value })}><option value="en">English</option><option value="fr">Français</option><option value="ar">العربية</option></select></label>
      <label>About your travel style<textarea value={profile.bio} onChange={(event) => setProfile({ ...profile, bio: event.target.value })} placeholder="Family travel, culture, desert adventures…" /></label>
      <button type="submit">Save profile</button>
      {message && <p className="profile-message" aria-live="polite">{message}</p>}
    </form>
  );
}
