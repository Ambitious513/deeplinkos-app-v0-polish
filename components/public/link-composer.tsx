"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

import { detectPresetFromUrl, normalizeUrl } from "@/lib/inference";
import { getPlatformDefinition, getPlatformLabel } from "@/lib/platform-registry";

type PreviewState = {
  url: string;
  hostname: string;
  preset: string;
  label: string;
  category: string;
  title: string | null;
  description: string | null;
  imageUrl: string | null;
  iconUrl: string | null;
};

const examples = [
  "amazon.com/dp/B08XYZ?tag=creator-20",
  "pinterest.com/pin/123456789",
  "reddit.com/r/marketing/comments/abc",
  "walmart.com/ip/123456",
];

function hostFromInput(value: string) {
  try {
    return new URL(normalizeUrl(value)).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export function LinkComposer() {
  const [url, setUrl] = useState(examples[0]);
  const [preview, setPreview] = useState<PreviewState | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  const localDetection = useMemo(() => {
    const preset = detectPresetFromUrl(url);
    const definition = getPlatformDefinition(preset);
    return {
      preset,
      label: getPlatformLabel(preset),
      category: definition?.category || "custom",
      hostname: hostFromInput(url),
    };
  }, [url]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/link-preview", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.error || "Unable to inspect this link.");
      }

      setPreview(body.preview);
      setStatus("idle");
    } catch (caught) {
      setPreview(null);
      setStatus("error");
      setError(caught instanceof Error ? caught.message : "Unable to inspect this link.");
    }
  }

  const activePreview = preview || {
    url,
    hostname: localDetection.hostname,
    preset: localDetection.preset,
    label: localDetection.label,
    category: localDetection.category,
    title: `${localDetection.label} smart link`,
    description: "Detected locally. Run preview to enrich title and favicon metadata.",
    imageUrl: null,
    iconUrl: null,
  };

  return (
    <div className="composer-card">
      <form onSubmit={handleSubmit} className="composer-form">
        <label htmlFor="composer-url">Destination URL</label>
        <div className="composer-input-row">
          <input
            id="composer-url"
            value={url}
            onChange={(event) => {
              setUrl(event.target.value);
              setPreview(null);
              setStatus("idle");
              setError("");
            }}
            placeholder="Paste Amazon, Reddit, Pinterest, YouTube..."
          />
          <button className="btn btn-primary" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Checking" : "Preview"}
          </button>
        </div>
      </form>

      <div className="composer-examples" aria-label="Example links">
        {examples.map((example) => (
          <button key={example} type="button" onClick={() => setUrl(example)}>
            {getPlatformLabel(detectPresetFromUrl(example))}
          </button>
        ))}
      </div>

      {status === "error" ? <p className="form-alert form-alert--error">{error}</p> : null}

      <div className="composer-preview">
        <div className="composer-preview__icon">
          {activePreview.iconUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={activePreview.iconUrl} alt="" />
          ) : (
            <span>{activePreview.label.slice(0, 1)}</span>
          )}
        </div>
        <div className="composer-preview__body">
          <div className="composer-preview__meta">
            <span>{activePreview.label}</span>
            <span>{activePreview.category}</span>
          </div>
          <h3>{activePreview.title || `${activePreview.label} smart link`}</h3>
          <p>{activePreview.hostname || "Paste a supported destination"}</p>
        </div>
      </div>

      <div className="composer-result-grid">
        <div>
          <span className="metric-label">Detected app</span>
          <strong>{activePreview.label}</strong>
        </div>
        <div>
          <span className="metric-label">Link type</span>
          <strong>{activePreview.category}</strong>
        </div>
        <div>
          <span className="metric-label">Affiliate params</span>
          <strong>Preserved</strong>
        </div>
      </div>

      <div className="composer-actions">
        <Link className="btn btn-primary" href={`/signup?next=${encodeURIComponent("/dashboard/links")}`}>
          Create smart link
        </Link>
        <Link className="btn btn-ghost" href="/tools/deep-link-generator">
          Open tool
        </Link>
      </div>
    </div>
  );
}
