# Phase 5A: Approved Public Frontend Restore

## Why this phase exists

The clean rebuild briefly used a functional scaffold for the public site and link composer. That was useful for validating the link engine, but it did not match the already-approved frontend stored in `_backups/approved-redesign-2026-06-17`.

Phase 5A restores that approved public frontend as the source of truth while keeping the new backend, auth, Supabase contract, and smart-link engine intact.

## What changed

- Restored the approved public homepage sections, pricing page, tools directory, blog index, blog detail placeholders, contact page, and legal pages.
- Restored approved public layout pieces: `SiteHeader`, `SiteFooter`, theme toggle, responsive navigation, and public content components.
- Restored approved frontend content data and public visual assets.
- Kept the real `/login`, `/signup`, `/onboarding`, dashboard, API routes, and link engine from the clean rebuild.
- Added `metadataBase` for production-safe Open Graph and Twitter image URLs.

## Product decision

The approved public frontend now drives the marketing and SEO-facing surface. The scaffold composer remains available as implementation reference, but it is no longer the homepage direction.

The next product step is to connect the approved hero/link generator interaction to the real Phase 3 smart-link inference and Phase 4 auth flow without changing the visual direction.

## Verification

- `npm.cmd run build`
- `npm.cmd test`

