# DeepLinkOS Source Inventory

## Old Reference Repo

```text
C:\Users\USER\Desktop\SORT KEYWORDS\SAFE MIGRATION
```

The old repo should be used as a reference source only. Do not bulk-copy it.

This new repo also includes a small reference snapshot:

```text
docs/reference/old-core-source
```

Those files are examples to port, clean, and test. They are not production files.

## Keep / Port

### Core Link Logic

- `lib/inference.ts`
- `lib/routing.ts`
- `lib/slug.ts`
- `lib/links.ts`
- `lib/store.ts`
- `lib/validation.ts`
- `lib/types.ts`
- `app/r/[slug]/page.tsx`
- `app/api/links/route.ts`
- `app/api/links/[slug]/route.ts`

Port carefully and clean encoding artifacts while moving.

### Supabase/Auth

- `lib/supabase/client.ts`
- `lib/supabase/server.ts`
- `lib/supabase/middleware.ts`
- `lib/supabase/tracking.ts`
- `middleware.ts`
- `components/auth/auth-modal.tsx`
- `components/dashboard/profile-modal.tsx`
- `app/onboarding/page.tsx`

Audit cookie domain logic and onboarding enforcement before launch.

### Dashboard References

- `docs/reference/dashboard-vision-prototype.html`
- `docs/reference/dashboard-vision-prototype.before-ia-review.html`
- `docs/reference/dashboard-inspo-1.webp`
- `docs/reference/dashboard-inspo-2.webp`
- `docs/reference/dashboard-inspo-3.webp`
- `docs/reference/agent-feedback-adjust-dropdown-on-mobile-2.md`

Use as design references, not production code.

### Approved Public Site Reference

- `_backups/approved-redesign-2026-06-17`

This is the cleanest public-site design backup. Use it for layout/copy/visual direction.

## Do Not Port Directly

- Old current `main` commit `1405e03`
- `legacy/public-routes-before-blank-canvas`
- `components/marketing`
- `content/marketing`
- `components/v3-marketing-shell.tsx`
- generated HTML mockups in the app root
- old media clutter unless a file is explicitly used by a page
- `.env.local`
- old `.env.example` values containing real-looking keys

## Known Problems In Old Repo

- Current `main` does not build.
- Conflict markers are committed in `app/(public)/blog/[slug]/page.tsx`.
- UI contains encoding artifacts like `â€¦`, `ðŸ`, `Â·`, and `Ã—`.
- `CreateLinkModal` exposes fields that schema/store do not fully persist.
- Link edit UI sends the wrong HTTP method for full edits.
- `supabase_schema.sql` lags behind runtime fields.
- Public site has duplicate implementation folders.
