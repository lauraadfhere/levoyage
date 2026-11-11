"use client";

import { useState } from "react";

type Kind = "review" | "view";

// Lets a signed-in traveller suggest a review or share a photo of a place or hotel.
// Submissions stay pending until an admin approves them.
export function PlaceSuggestionForm({ placeName, placeType, propertyId }: { placeName: string; placeType: "place" | "hotel"; propertyId?: string }) {
  const [kind, setKind] = useState<Kind>("review");
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    try {
      let mediaObjectId = "";
      if (kind === "view" && file) {
        const form = new FormData();
        form.append("file", file);
        form.append("ownerType", "user");
        const upload = await fetch("/api/media/upload", { method: "POST", body: form });
        const uploaded = await upload.json();
        if (!upload.ok) throw new Error(uploaded.error || "Photo upload failed.");
        mediaObjectId = uploaded.id;
      }
      const response = await fetch("/api/place-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, placeName, placeType, propertyId, rating: kind === "review" ? rating : undefined, body, mediaObjectId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not submit.");
      setStatus("sent");
      setMessage("Thanks. Your suggestion is pending review and will appear once approved.");
      setBody("");
      setFile(null);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Could not submit.");
    }
  }

  return (
    <form onSubmit={submit} className="place-suggestion-form">
      <h3>Share your experience</h3>
      <fieldset>
        <legend>What would you like to share?</legend>
        <label><input type="radio" name="kind" checked={kind === "review"} onChange={() => setKind("review")} /> Review</label>{" "}
        <label><input type="radio" name="kind" checked={kind === "view"} onChange={() => setKind("view")} /> Photo of my view</label>
      </fieldset>
      {kind === "review" ? (
        <label>
          Rating
          <select value={rating} onChange={(event) => setRating(Number(event.target.value))}>
            {[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value} / 5</option>)}
          </select>
        </label>
      ) : (
        <label>
          Photo (JPEG, PNG, WebP or AVIF, up to 25 MB)
          <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={(event) => setFile(event.target.files?.[0] || null)} required />
        </label>
      )}
      <label>
        {kind === "review" ? "Your review" : "Describe the view (optional)"}
        <textarea value={body} onChange={(event) => setBody(event.target.value)} maxLength={1000} rows={4} />
      </label>
      <button type="submit" disabled={status === "sending" || (kind === "view" && !file)}>
        {status === "sending" ? "Sending…" : "Submit for review"}
      </button>
      {message ? <p role={status === "error" ? "alert" : "status"}>{message}</p> : null}
    </form>
  );
}
