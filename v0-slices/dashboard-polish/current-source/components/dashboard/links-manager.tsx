"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { LinkRecord } from "@/lib/types";

type LinksManagerProps = {
  initialLinks: LinkRecord[];
  siteUrl: string;
};

type CreateState = {
  destinationUrl: string;
  title: string;
  campaign: string;
};

function shortUrl(siteUrl: string, slug: string) {
  return `${siteUrl.replace(/\/+$/, "")}/r/${slug}`;
}

function platformLabel(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function LinksManager({ initialLinks, siteUrl }: LinksManagerProps) {
  const router = useRouter();
  const [links, setLinks] = useState(initialLinks);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState<CreateState>({ destinationUrl: "", title: "", campaign: "" });
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const filteredLinks = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return links;
    return links.filter((link) =>
      [link.title, link.slug, link.destinationUrl, link.preset, link.campaign]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [links, query]);

  async function createLink() {
    setError(null);
    setNotice(null);
    setIsCreating(true);

    const response = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        destinationUrl: form.destinationUrl,
        title: form.title || undefined,
        campaign: form.campaign || undefined,
      }),
    });

    const payload = await response.json().catch(() => null);
    setIsCreating(false);

    if (!response.ok) {
      setError(payload?.error || "Unable to create link.");
      return;
    }

    setLinks((current) => [payload.link, ...current]);
    setForm({ destinationUrl: "", title: "", campaign: "" });
    setNotice(`Created ${payload.shortUrl || shortUrl(siteUrl, payload.link.slug)}`);
    router.refresh();
  }

  async function toggleLink(link: LinkRecord) {
    setError(null);
    setNotice(null);

    const response = await fetch(`/api/links/${link.slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !link.isActive }),
    });

    const payload = await response.json().catch(() => null);
    if (!response.ok) {
      setError(payload?.error || "Unable to update link.");
      return;
    }

    setLinks((current) => current.map((item) => (item.id === payload.link.id ? payload.link : item)));
    router.refresh();
  }

  async function deleteLink(link: LinkRecord) {
    setError(null);
    setNotice(null);

    const response = await fetch(`/api/links/${link.slug}`, { method: "DELETE" });
    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      setError(payload?.error || "Unable to delete link.");
      return;
    }

    setLinks((current) => current.filter((item) => item.id !== link.id));
    setNotice(`Deleted ${link.title}`);
    router.refresh();
  }

  async function copyLink(link: LinkRecord) {
    const value = shortUrl(siteUrl, link.slug);
    await navigator.clipboard.writeText(value);
    setNotice(`Copied ${value}`);
  }

  return (
    <div className="links-manager">
      <div className="links-composer panel">
        <div>
          <div className="eyebrow">Create</div>
          <h3>Create a smart link</h3>
          <p>Paste any social, marketplace, affiliate, or app URL. DeepLinkOS will infer the platform and app routes.</p>
        </div>

        <div className="links-composer__grid">
          <label>
            Destination URL
            <input
              value={form.destinationUrl}
              onChange={(event) => setForm((current) => ({ ...current, destinationUrl: event.target.value }))}
              placeholder="https://amazon.com/dp/example"
              type="url"
            />
          </label>
          <label>
            Title
            <input
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              placeholder="Summer campaign"
            />
          </label>
          <label>
            Campaign
            <input
              value={form.campaign}
              onChange={(event) => setForm((current) => ({ ...current, campaign: event.target.value }))}
              placeholder="launch-q3"
            />
          </label>
          <button className="btn btn-primary links-composer__submit" type="button" onClick={createLink} disabled={isCreating || !form.destinationUrl.trim()}>
            {isCreating ? "Creating..." : "Create link"}
          </button>
        </div>

        {error ? <p className="links-manager__alert links-manager__alert--error">{error}</p> : null}
        {notice ? <p className="links-manager__alert">{notice}</p> : null}
      </div>

      <div className="links-toolbar">
        <label className="links-search">
          <span>Search links</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Title, slug, campaign, platform..." />
        </label>
        <div className="links-toolbar__meta">{filteredLinks.length} shown</div>
      </div>

      <div className="table-card links-table-card">
        <table className="table links-table">
          <thead>
            <tr>
              <th>Smart link</th>
              <th>Platform</th>
              <th>Status</th>
              <th>Destination</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLinks.map((link) => (
              <tr key={link.id}>
                <td>
                  <strong>{link.title}</strong>
                  <span>{shortUrl(siteUrl, link.slug)}</span>
                </td>
                <td>{platformLabel(link.preset)}</td>
                <td>
                  <span className={link.isActive ? "links-status links-status--active" : "links-status"}>{link.isActive ? "Active" : "Paused"}</span>
                </td>
                <td>
                  <a href={link.destinationUrl || link.desktopUrl || "#"} target="_blank" rel="noreferrer">
                    {link.destinationUrl || link.desktopUrl || "No destination"}
                  </a>
                </td>
                <td>
                  <div className="links-actions">
                    <button type="button" onClick={() => void copyLink(link)}>
                      Copy
                    </button>
                    <button type="button" onClick={() => void toggleLink(link)}>
                      {link.isActive ? "Pause" : "Resume"}
                    </button>
                    <button type="button" onClick={() => void deleteLink(link)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!filteredLinks.length ? (
              <tr>
                <td colSpan={5}>
                  <div className="links-empty">No links yet. Create your first smart link above.</div>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
