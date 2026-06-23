# DeepLinkOS Stabilization Checklist

## Summary

Complete these product and backend fixes before shipping or asking v0 to do final UI integration. v0 can design the dashboard, but it should not invent or rewrite these contracts.

## Database Contract

Create a complete Supabase schema for:

- `profiles`: user identity, avatar, timestamps.
- `deep_links`: smart link configuration, destination fallbacks, password, expiry, A/B URL, UTM/routing config, status, timestamps.
- `clicks`: link reference, timestamp, device, OS, browser, referrer, UTM fields, country/city, IP hash, variant.
- `domains`: user-owned custom domains, status, verification metadata, timestamps.

Required RPCs:

- `get_dashboard_analytics(user_uuid, days_ago)`
- `get_clicks_by_day(user_uuid, days_ago)`
- `get_global_analytics(user_uuid)`

Required RLS:

- Public can read active links for redirect resolution.
- Anonymous users can insert click rows only if needed for tracking.
- Authenticated users can manage their own links/domains/profile.
- Users can view clicks only for their own links.

Required dedup:

- Prevent repeat same-link/same-IP clicks from inflating analytics within a short window.
- Prefer a generated minute bucket column or equivalent stable unique index.

## API Contract

### `POST /api/links`

Accepts:

- destination URL
- optional title/slug
- inferred or manual platform URLs
- password
- expiry
- A/B test URL
- campaign and UTM fields

Returns:

- created link record
- absolute short URL

### `PATCH /api/links/[slug]`

Use only for status toggles:

- `is_active`

### `PUT /api/links/[slug]`

Use for full edit:

- title
- slug if supported
- destination/fallback URLs
- password
- expiry
- A/B URL
- UTM/campaign fields

If slug editing is supported, handle uniqueness and return the new slug.

### `DELETE /api/links/[slug]`

Delete only if authenticated user owns the link.

## Redirect Contract

Preserve:

- `/r/[slug]` dynamic rendering.
- inactive/missing/expired handling.
- password gate.
- server redirect for desktop and simple fallback cases.
- app-scheme attempt with timed fallback on mobile.
- bot and link-preview filtering.
- prefetch filtering.
- hashed IP click tracking.
- UTM passthrough.
- A/B variant assignment and click variant storage.

## Security / Secrets

- Rotate any real-looking key that was committed in the old repo.
- `.env.example` must contain placeholders only.
- `.env.local` must never be copied or committed.
- Service role key must not be exposed client-side.

## Quality Gates

Before deployment:

- `npm run build`
- `npm test`
- create-link smoke test
- edit-link smoke test
- pause/resume smoke test
- redirect smoke test on desktop, iOS-like UA, Android-like UA
- dashboard render at 390px, 430px, 1280px, 1440px

