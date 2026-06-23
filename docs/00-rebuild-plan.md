# DeepLinkOS Clean Rebuild Plan

## Summary

Create a new production candidate for DeepLinkOS in this repo instead of repairing the broken old `deeplinkos` main branch. The old repo is now a reference archive. The new repo should selectively import trusted functionality, rebuild the shell cleanly, stabilize the database contract, then hand dashboard/public UI work to v0 with strict boundaries.

## Key Decisions

- Use this repo as the canonical production rebuild: `Ambitious513/deeplinkos-app`.
- Do not continue from old `main` commit `1405e03`; it is non-buildable and contains committed conflict markers.
- Treat old commit `97dc9a1` and `_backups/approved-redesign-2026-06-17` as UI/reference sources.
- Preserve the proven core link logic from the old repo, but audit and normalize it before launch.
- Use managed Supabase unless there is a strong reason to self-host again.
- Do not redeploy old Supabase/Logflare/n8n stacks to the clean VPS.

## Build Phases

### Phase 1: Scaffold Clean Next.js App

- Create a fresh Next.js App Router project with TypeScript.
- Use React 19 and Next 15 to match the old app unless a deployment blocker appears.
- Add only required dependencies first:
  - `@supabase/ssr`
  - `@supabase/supabase-js`
  - `zod`
  - `chart.js`
  - `react-chartjs-2`
  - `nextjs-toploader`
  - `vitest`
- Add a normal `.gitignore`, `.env.example`, and `db/schema.sql`.
- Keep source layout simple:

```text
app/
  (public)/
  (dashboard)/
  api/
  r/[slug]/
components/
  auth/
  dashboard/
  public/
lib/
  supabase/
  links/
  routing/
db/
docs/
```

### Phase 2: Import Protected Core Logic

Import and clean these concepts from the old repo:

- Platform inference and native app URI generation.
- Link creation validation and slug normalization.
- Supabase server/client/tracking clients.
- Redirect route behavior for `/r/[slug]`.
- Click tracking with bot filter, prefetch filter, IP hash, UTM passthrough, and variant recording.

Protected behavior that must not regress:

- Desktop traffic redirects server-side to web fallback.
- iOS/Android traffic opens app scheme first, then store/web fallback.
- Missing, inactive, expired, or locked links do not leak destination URLs.
- Social preview bots and prefetch requests are not counted as human clicks.
- Incoming UTM params override stored UTM params.

### Phase 3: Stabilize Supabase Contract

Create one complete schema/migration set before UI work:

- `profiles`: `id`, `email`, `first_name`, `last_name`, `avatar_url`, timestamps.
- `deep_links`: all fields used by create/edit/redirect/dashboard.
- `clicks`: includes `variant`, device/os/browser/referrer/country/city, hashed IP, timestamps.
- `domains`: custom domain ownership and verification state.
- RLS policies for authenticated ownership and public redirect reads.
- RPCs for dashboard summary and chart aggregation.
- Unique dedup strategy for clicks so repeated same-IP hits within a short window do not inflate counts.

### Phase 4: Dashboard With v0

Give v0 `docs/03-v0-dashboard-implementation-brief.md`.

v0 should redesign dashboard UI only. It must preserve data fetching patterns, APIs, and core redirect behavior.

### Phase 5: Public Site With v0

Give v0 `docs/04-v0-public-site-polish-brief.md`.

Use the approved public-site backup and current product direction as references. Keep public site separate from dashboard implementation.

### Phase 6: Deployment

- Deploy clean app to Coolify only after `npm run build` and tests pass.
- Configure only required environment variables.
- Keep the VPS free of old self-hosted Supabase/Logflare/n8n workloads.
- Smoke test:
  - homepage
  - auth modal
  - onboarding
  - create link
  - redirect link
  - analytics click appears
  - dashboard pages
  - mobile layout

## Acceptance Criteria

- New repo builds from a clean clone.
- No old generated HTML/mockup clutter in app root.
- No committed secrets.
- Core link flow works end-to-end.
- Dashboard is visually aligned with the approved prototype direction.
- The clean VPS runs only the current production app and required services.

