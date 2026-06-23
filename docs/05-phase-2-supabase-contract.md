# Phase 2 Supabase Contract

## Status

Phase 2 establishes the data and Supabase boundary for the clean rebuild. The app still uses placeholder UI and redirect behavior; this phase is intentionally about contract stability.

## Added

- `.env.example` with placeholder-only Supabase, site, hash salt, and email variables.
- `db/schema.sql` for the fresh Supabase project.
- `lib/database.types.ts` as the current application-side database contract.
- Supabase clients:
  - `lib/supabase/client.ts` for browser components.
  - `lib/supabase/server.ts` for Server Components and Route Handlers.
  - `lib/supabase/admin.ts` for server-only service-role operations.
  - `lib/supabase/tracking.ts` for cookie-free click inserts.
  - `lib/supabase/middleware.ts` for auth refresh, dashboard protection, and custom-domain rewrites.
- Root `middleware.ts` wired to the Supabase middleware helper.

## Schema Highlights

- `profiles` stores account/workspace identity and onboarding completion.
- `deep_links` stores slug, destination, native app URLs, fallbacks, UTM defaults, expiry, password hash, A/B URL, tags, metadata, and status.
- `clicks` stores deduped click analytics, bot/prefetch flags, UTM fields, geo/referrer/device fields, IP hash, and variant.
- `domains` stores custom domain ownership and verification state.
- RLS is enabled on all product tables.
- Dashboard RPCs exist for summary cards, daily chart data, and global breakdowns.
- Click dedupe uses a partial unique index on `(link_id, ip_hash, dedupe_bucket)` for non-bot, non-prefetch clicks.

## Build Check

`npm.cmd run build` passes.

Known watch item: Next emits a middleware warning from `@supabase/supabase-js` using `process.version` in the Edge runtime import path. This does not currently fail the build, but should be watched during deploy smoke testing.

## Next Phase

Phase 3 should port and test the protected core link functionality:

- slug normalization and validation
- platform inference
- destination routing
- `/api/links`
- `/api/links/[slug]`
- `/r/[slug]`
- bot/prefetch filtering
- IP hashing and click tracking
- UTM passthrough and A/B variant storage
